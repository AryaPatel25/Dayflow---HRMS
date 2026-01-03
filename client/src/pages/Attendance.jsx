import React, { useState, useEffect, useCallback } from 'react';
import { format, addDays, subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
import {
  LogIn, LogOut, Search, Calendar, Clock, User, CheckCircle2, XCircle,
  Users, ChevronLeft, ChevronRight, Edit2, Trash2, Loader2, BarChart3,
  TrendingUp, Activity, Timer, FileText, Plus, MessageSquare, Download, Eye
} from 'lucide-react';
import { attendanceAPI } from '../http/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Select, SelectItem } from '../components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

const Attendance = () => {
  const [userRole, setUserRole] = useState('employee');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employeeId, setEmployeeId] = useState('LLM 003');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [editingRecord, setEditingRecord] = useState(null);
  const [editStatus, setEditStatus] = useState('Present');
  const [isLoading, setIsLoading] = useState(false);
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [isClockingOut, setIsClockingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadAttendanceRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      let response;
      const options = { view: viewMode };

      if (viewMode === 'day') {
        options.date = format(selectedDate, 'yyyy-MM-dd');
      } else if (viewMode === 'week') {
        options.week = format(selectedDate, 'yyyy-MM-dd');
      } else {
        options.month = selectedDate.getMonth() + 1;
        options.year = selectedDate.getFullYear();
      }

      if (userRole === 'admin') {
        response = await attendanceAPI.getAllAttendance(options);
      } else {
        response = await attendanceAPI.getMyAttendance(employeeId, options);
      }

      if (response.success) {
        const formattedRecords = response.data.records.map((record) => ({
          id: record._id,
          employeeId: record.employeeId?._id || record.employeeId,
          employeeName: record.employeeId?.name || 'N/A',
          employeeEmail: record.employeeId?.email || 'N/A',
          date: new Date(record.date),
          timeIn: record.checkIn ? format(new Date(record.checkIn), 'hh:mm a') : '-',
          timeOut: record.checkOut ? format(new Date(record.checkOut), 'hh:mm a') : '-',
          totalHours: record.workHours
            ? `${Math.floor(record.workHours / 60)}h ${record.workHours % 60}m`
            : '-',
          status: record.status,
          remarks: record.remarks || '',
        }));
        setAttendanceRecords(formattedRecords);
        setSummary(response.data.summary);
      }
    } catch (error) {
      console.error('Load attendance error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [employeeId, userRole, viewMode, selectedDate]);

  useEffect(() => {
    loadAttendanceRecords();
  }, [loadAttendanceRecords]);

  const handleClockIn = async () => {
    if (!isClockedIn) {
      setIsClockingIn(true);
      try {
        const response = await attendanceAPI.clockIn(employeeId);
        if (response.success) {
          setIsClockedIn(true);
          setClockInTime(new Date(response.data.checkIn));
          loadAttendanceRecords();
        } else {
          alert(response.message || 'Failed to clock in');
        }
      } catch (error) {
        console.error('Clock in error:', error);
        alert('Failed to clock in. Please try again.');
      } finally {
        setIsClockingIn(false);
      }
    }
  };

  const handleClockOut = async () => {
    if (isClockedIn) {
      setIsClockingOut(true);
      try {
        const response = await attendanceAPI.clockOut(employeeId);
        if (response.success) {
          setIsClockedIn(false);
          loadAttendanceRecords();
          setClockInTime(null);
        } else {
          alert(response.message || 'Failed to clock out');
        }
      } catch (error) {
        console.error('Clock out error:', error);
        alert('Failed to clock out. Please try again.');
      } finally {
        setIsClockingOut(false);
      }
    }
  };

  const handleStatusUpdate = async (recordId, newStatus) => {
    try {
      const response = await attendanceAPI.updateAttendance(recordId, { status: newStatus });
      if (response.success) {
        loadAttendanceRecords();
        setEditingRecord(null);
      } else {
        alert(response.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        const response = await attendanceAPI.deleteAttendance(recordId);
        if (response.success) {
          loadAttendanceRecords();
        } else {
          alert(response.message || 'Failed to delete record');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete record. Please try again.');
      }
    }
  };

  const navigateDate = (direction) => {
    if (viewMode === 'day') {
      setSelectedDate(direction === 'next' ? addDays(selectedDate, 1) : subDays(selectedDate, 1));
    } else if (viewMode === 'week') {
      setSelectedDate(direction === 'next' ? addWeeks(selectedDate, 1) : subWeeks(selectedDate, 1));
    } else {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      setSelectedDate(newDate);
    }
    setCurrentPage(1);
  };

  const getDateRangeText = () => {
    if (viewMode === 'day') {
      return format(selectedDate, 'MMMM dd, yyyy');
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
      return `${format(weekStart, 'MMM dd')} - ${format(weekEnd, 'MMM dd, yyyy')}`;
    } else {
      return format(selectedDate, 'MMMM yyyy');
    }
  };

  const filteredRecords = attendanceRecords.filter((record) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      format(record.date, 'MMM dd, yyyy').toLowerCase().includes(searchLower) ||
      record.employeeName.toLowerCase().includes(searchLower) ||
      record.employeeEmail.toLowerCase().includes(searchLower) ||
      record.status.toLowerCase().includes(searchLower)
    );
  });

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(filteredRecords.length / entriesPerPage);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Present': { 
        bg: 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20', 
        text: 'text-emerald-300', 
        border: 'border-emerald-500/30', 
        icon: CheckCircle2,
        glow: 'shadow-emerald-500/20'
      },
      'Absent': { 
        bg: 'bg-gradient-to-r from-rose-500/20 to-rose-600/20', 
        text: 'text-rose-300', 
        border: 'border-rose-500/30', 
        icon: XCircle,
        glow: 'shadow-rose-500/20'
      },
      'Leave': { 
        bg: 'bg-gradient-to-r from-amber-500/20 to-amber-600/20', 
        text: 'text-amber-300', 
        border: 'border-amber-500/30', 
        icon: Calendar,
        glow: 'shadow-amber-500/20'
      },
      'Half-day': { 
        bg: 'bg-gradient-to-r from-blue-500/20 to-blue-600/20', 
        text: 'text-blue-300', 
        border: 'border-blue-500/30', 
        icon: Clock,
        glow: 'shadow-blue-500/20'
      },
    };

    const config = statusConfig[status] || statusConfig['Present'];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${config.bg} ${config.text} border ${config.border} shadow-lg ${config.glow} backdrop-blur-sm transition-all duration-200 hover:scale-105`}>
        <Icon className="h-4 w-4" />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex justify-center">
        <div className="w-full max-w-6xl px-16 py-20">
          {/* Enhanced Header Section */}
          <div className="mb-48">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-24">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/20">
                  <Activity className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {userRole === 'admin' ? 'Attendance Dashboard' : 'My Attendance'}
                  </h1>
                  <p className="text-gray-400 text-lg mt-1">
                    {userRole === 'admin'
                      ? 'Monitor and manage team attendance'
                      : 'Track your work hours and attendance'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-1">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-white font-semibold text-sm">{getDateRangeText()}</p>
                      <p className="text-gray-400 text-xs">Current Period</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button
                variant="outline"
                onClick={() => setUserRole(userRole === 'admin' ? 'employee' : 'admin')}
                className="px-6 py-3 bg-gray-900/80 backdrop-blur-sm border-gray-700/50 text-white hover:bg-gray-800/80 transition-all rounded-2xl h-auto shadow-lg hover:shadow-xl"
              >
                <Users className="h-5 w-5 mr-2" />
                {userRole === 'admin' ? 'Employee' : 'Admin'}
              </Button>
            </div>
          </div>
        </div>

          {/* Attendance Content */}
          {/* Enhanced Summary Cards */}
          {summary && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-emerald-500/20" >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between" >
                      <div className="flex flex-col items-center justify-center text-center flex-1" >
                        <div className="p-3 rounded-xl bg-gray-800/80 mb-4 group-hover:bg-gray-700/80 transition-colors border border-emerald-500/20">
                          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                        </div>
                        <p className="text-gray-300 text-sm font-medium mb-2">Present</p>
                    <p className="text-3xl font-bold text-white">{summary.presentDays || summary.presentCount || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-emerald-400/50 group-hover:text-emerald-400 transition-colors" />
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-rose-500/10 to-rose-600/10 backdrop-blur-sm border border-rose-500/20 hover:border-rose-400/40 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-rose-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center justify-center text-center flex-1">
                    <div className="p-3 rounded-xl bg-gray-800/80 mb-4 group-hover:bg-gray-700/80 transition-colors border border-rose-500/20">
                      <XCircle className="h-6 w-6 text-rose-400" />
                    </div>
                    <p className="text-gray-300 text-sm font-medium mb-2">Absent</p>
                    <p className="text-3xl font-bold text-white">{summary.absentDays || summary.absentCount || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-rose-400/50 group-hover:text-rose-400 transition-colors rotate-180" />
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-sm border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-amber-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center justify-center text-center flex-1">
                    <div className="p-3 rounded-xl bg-gray-800/80 mb-4 group-hover:bg-gray-700/80 transition-colors border border-amber-500/20">
                      <Calendar className="h-6 w-6 text-amber-400" />
                    </div>
                    <p className="text-gray-300 text-sm font-medium mb-2">Leave</p>
                    <p className="text-3xl font-bold text-white">{summary.leaveDays || summary.leaveCount || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-amber-400/50 group-hover:text-amber-400 transition-colors" />
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center justify-center text-center flex-1">
                    <div className="p-3 rounded-xl bg-gray-800/80 mb-4 group-hover:bg-gray-700/80 transition-colors border border-blue-500/20">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                    <p className="text-gray-300 text-sm font-medium mb-2">Half Day</p>
                    <p className="text-3xl font-bold text-white">{summary.halfDays || summary.halfDayCount || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>
          )}

          {/* Enhanced View Mode & Navigation */}
          <Card className="mb-16 bg-gray-900/60 backdrop-blur-sm border-gray-700/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-1 py-1 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                  {['day', 'week', 'month'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setViewMode(mode);
                        setCurrentPage(1);
                      }}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        viewMode === mode
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/60 hover:scale-105'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="hidden sm:block text-gray-400 text-sm">
                  <BarChart3 className="h-4 w-4 inline mr-2" />
                  View Mode
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate('prev')}
                  className="h-12 w-12 rounded-xl bg-gray-800/60 border-gray-700/50 text-white hover:bg-gray-700/60 hover:scale-105 transition-all shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDate(new Date());
                    setCurrentPage(1);
                  }}
                  className="px-6 h-12 rounded-xl bg-gray-800/60 border-gray-700/50 text-white hover:bg-gray-700/60 hover:scale-105 transition-all shadow-lg"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate('next')}
                  className="h-12 w-12 rounded-xl bg-gray-800/60 border-gray-700/50 text-white hover:bg-gray-700/60 hover:scale-105 transition-all shadow-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-24 mt-20">
            {/* Enhanced Clock In/Out Card - Only for Employees */}
          {userRole === 'employee' && (
            <div className="lg:col-span-4 animate-fade-in mb-8" >
              <div className="sticky top-12">
                <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 p-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 rounded-xl bg-cyan-500/20">
                        <Timer className="h-5 w-5 text-cyan-400" />
                      </div>
                      Time Clock
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 space-y-6">
                    {/* Enhanced Clock Display */}
                    <div className="rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 p-8 text-center shadow-inner">
                      <p className="text-cyan-400 text-sm uppercase tracking-widest font-semibold mb-4">
                        {format(currentTime, 'EEEE')}
                      </p>
                      <p className="text-white text-6xl font-bold tracking-tight font-mono mb-4">
                        {format(currentTime, 'hh:mm:ss a')}
                      </p>
                      <p className="text-gray-300 text-base font-medium">
                        {format(currentTime, 'MMMM dd, yyyy')}
                      </p>
                      {isClockedIn && clockInTime && (
                        <div className="mt-6 pt-6 border-t border-gray-700/50">
                          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Clocked in at</p>
                          <p className="text-cyan-400 font-semibold text-xl">{format(clockInTime, 'hh:mm a')}</p>
                        </div>
                      )}
                    </div>

                    {/* Employee ID Input */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Employee ID
                      </label>
                      <Input
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="bg-gray-800/60 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl h-12 text-base"
                        placeholder="Enter Employee ID"
                      />
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="space-y-4 mt-6">
                      <Button
                        onClick={handleClockIn}
                        disabled={isClockedIn || isClockingIn}
                        className={`w-full h-14 rounded-xl font-semibold text-base transition-all duration-200 ${
                          isClockedIn
                            ? 'bg-gray-800/60 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105'
                        }`}
                      >
                        {isClockingIn ? (
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                          <LogIn className="h-5 w-5 mr-2" />
                        )}
                        {isClockingIn ? 'Clocking In...' : 'Clock In'}
                      </Button>
                      <Button
                        onClick={handleClockOut}
                        disabled={!isClockedIn || isClockingOut}
                        className={`w-full h-14 rounded-xl font-semibold text-base transition-all duration-200 ${
                          !isClockedIn
                            ? 'bg-gray-800/60 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105'
                        }`}
                      >
                        {isClockingOut ? (
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                          <LogOut className="h-5 w-5 mr-2" />
                        )}
                        {isClockingOut ? 'Clocking Out...' : 'Clock Out'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Enhanced Attendance Table */}
          <div className={userRole === 'employee' ? 'lg:col-span-8 animate-fade-in animation-delay-200 mb-8' : 'lg:col-span-12 animate-fade-in animation-delay-200 mb-8'}>
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 p-2">
              <CardContent className="p-16">
                {/* Table Header with Loading State */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-20">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                      <BarChart3 className="h-8 w-8 text-cyan-400" />
                      Attendance Records
                    </h2>
                    <p className="text-gray-400 flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading records...
                        </>
                      ) : (
                        `${filteredRecords.length} total records`
                      )}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial sm:w-72">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 bg-gray-800/60 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl h-12 text-base"
                        placeholder="Search records..."
                      />
                    </div>
                    <Select
                      value={`${entriesPerPage} entries`}
                      onValueChange={(val) => {
                        const num = parseInt(val.replace(' entries', ''));
                        setEntriesPerPage(num);
                        setCurrentPage(1);
                      }}
                      className="w-40 bg-gray-800/60 border-gray-700/50 rounded-xl"
                    >
                      <SelectItem value="10 entries">10 entries</SelectItem>
                      <SelectItem value="25 entries">25 entries</SelectItem>
                      <SelectItem value="50 entries">50 entries</SelectItem>
                      <SelectItem value="100 entries">100 entries</SelectItem>
                    </Select>
                  </div>
                </div>

                {/* Enhanced Table */}
                <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 mb-20 shadow-inner">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700/50 hover:bg-transparent bg-gray-800/60">
                        {userRole === 'admin' && (
                          <TableHead className="text-slate-300 font-semibold text-sm py-5 px-6">Employee</TableHead>
                        )}
                        <TableHead className="text-slate-300 font-semibold text-sm py-5 px-6">Date</TableHead>
                        <TableHead className="text-slate-300 font-semibold text-sm py-5 px-6">Time In</TableHead>
                        <TableHead className="text-slate-300 font-semibold text-sm py-5 px-6">Time Out</TableHead>
                        <TableHead className="text-slate-300 font-semibold text-sm py-5 px-6">Hours</TableHead>
                        <TableHead className="text-slate-300 font-semibold text-sm py-5 px-6">Status</TableHead>
                        {userRole === 'admin' && (
                          <TableHead className="text-slate-300 font-semibold text-sm py-5 px-6 text-right">Actions</TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow className="border-slate-800/50">
                          <TableCell colSpan={userRole === 'admin' ? 7 : 5} className="text-center py-20">
                            <div className="flex flex-col items-center gap-5">
                              <div className="h-16 w-16 rounded-2xl bg-black/50 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
                              </div>
                              <div className="space-y-2">
                                <p className="text-slate-300 font-semibold text-xl">Loading attendance records...</p>
                                <p className="text-slate-500 text-base">Please wait while we fetch your data</p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : paginatedRecords.length > 0 ? (
                        paginatedRecords.map((record) => (
                          <TableRow 
                            key={record.id} 
                            className="border-slate-800/50 hover:bg-slate-900/30 transition-all duration-200 group"
                          >
                            {userRole === 'admin' && (
                              <TableCell className="text-white py-6 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                                    <User className="h-5 w-5 text-cyan-400" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-base text-white">{record.employeeName}</p>
                                    <p className="text-sm text-slate-400 mt-1">{record.employeeEmail}</p>
                                  </div>
                                </div>
                              </TableCell>
                            )}
                            <TableCell className="text-white font-medium py-6 px-6">
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <span className="text-base">{format(record.date, 'MMM dd, yyyy')}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-300 font-mono text-base py-6 px-6">{record.timeIn}</TableCell>
                            <TableCell className="text-slate-300 font-mono text-base py-6 px-6">{record.timeOut}</TableCell>
                            <TableCell className="text-white font-semibold text-base py-6 px-6">{record.totalHours}</TableCell>
                            <TableCell className="py-6 px-6">
                              {getStatusBadge(record.status)}
                            </TableCell>
                            {userRole === 'admin' && (
                              <TableCell className="text-right py-6 px-6">
                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {editingRecord === record.id ? (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => handleStatusUpdate(record.id, editStatus)}
                                        className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white h-9 px-4 rounded-xl shadow-lg"
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setEditingRecord(null)}
                                        className="border-slate-800/50 text-slate-300 hover:bg-slate-900/50 h-9 px-4 rounded-xl"
                                      >
                                        Cancel
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          setEditingRecord(record.id);
                                          setEditStatus(record.status);
                                        }}
                                        className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 h-10 w-10 p-0 rounded-xl"
                                      >
                                        <Edit2 className="h-5 w-5" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(record.id)}
                                        className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 h-10 w-10 p-0 rounded-xl"
                                      >
                                        <Trash2 className="h-5 w-5" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            )}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow className="border-slate-800/50">
                          <TableCell colSpan={userRole === 'admin' ? 7 : 5} className="text-center py-20">
                            <div className="flex flex-col items-center gap-5">
                              <div className="h-24 w-24 rounded-2xl bg-gradient-to-r from-black/50 to-slate-900/50 flex items-center justify-center">
                                <Calendar className="h-12 w-12 text-slate-500" />
                              </div>
                              <div className="space-y-2">
                                <p className="text-slate-300 font-semibold text-xl">No attendance records found</p>
                                <p className="text-slate-500 text-base max-w-md">
                                  {userRole === 'employee' 
                                    ? 'Start by clocking in to create your first attendance record'
                                    : 'No records match your current search criteria or date range'}
                                </p>
                              </div>
                              {userRole === 'employee' && !isClockedIn && (
                                <Button
                                  onClick={handleClockIn}
                                  disabled={isClockingIn}
                                  className="mt-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg"
                                >
                                  {isClockingIn ? (
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                  ) : (
                                    <LogIn className="h-5 w-5 mr-2" />
                                  )}
                                  Clock In Now
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Enhanced Pagination */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-10 pt-8 border-t border-slate-800/50">
                  <p className="text-sm text-slate-400">
                    Showing <span className="text-white font-semibold">{paginatedRecords.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0}</span> to{' '}
                    <span className="text-white font-semibold">{Math.min(currentPage * entriesPerPage, filteredRecords.length)}</span> of{' '}
                    <span className="text-white font-semibold">{filteredRecords.length}</span> entries
                  </p>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="border-slate-800/50 text-slate-300 hover:bg-slate-900/50 hover:text-white disabled:opacity-30 rounded-xl h-11 px-5 transition-all"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={
                              currentPage === page
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30 min-w-[3rem] h-11 rounded-xl'
                                : 'border-slate-800/50 text-slate-300 hover:bg-slate-900/50 hover:text-white min-w-[3rem] h-11 rounded-xl transition-all'
                            }
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="border-slate-800/50 text-slate-300 hover:bg-slate-900/50 hover:text-white disabled:opacity-30 rounded-xl h-11 px-5 transition-all"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
