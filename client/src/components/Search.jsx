import React from "react";

const Search = () => {
  return (
    <div className="w-full h-15 border-b border-zinc-700 flex justify-between items-center px-20">
      <div className="flex items-center gap-2 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-900">
        <AddIcon />
        <p className="text-sm inline">New</p>
      </div>
      <div className="w-120 justify-between flex items-center bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none ml-2">
        <input type="text" placeholder="Search..." className="outline-none" />
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;

const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="icon icon-tabler icons-tabler-filled icon-tabler-circle-plus"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14m8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" />
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-search text-zinc-500"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
  );
};
