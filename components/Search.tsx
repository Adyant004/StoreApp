"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { getFiles } from "@/lib/actions/file.actions";
import Thumbnail from "./Thumbnail";
import { useDebounce } from 'use-debounce';

const Search = () => {
  const [query,setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [result,setResult] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query,300);

  useEffect(() => {
    const fetchFiles = async () => {
      if(debouncedQuery.length === 0){
        setResult([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(),""));
      }
      const files = await getFiles({types:[], searchText: debouncedQuery});

      setResult(files.documents);
      setOpen(true);
    }

    fetchFiles();
  },[debouncedQuery]);

  useEffect(() => {
    if(!searchQuery){
      setQuery("");
    }
  },[searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResult([]);

    router.push(`/${file.type === 'video' || file.type === 'audio' ? "media" : file.type + 's'}?query=${query}`);
  }

  return (
    <div className="search">
        <div className="search-input-wrapper">
          <Image  src={"/assets/icons/search.svg"} alt="search" width={24} height={24} />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} />
          {
            open && (
              <ul className="search-result">
                {result.length > 0 ? (
                  result.map((file) => (
                    <li onClick={() => handleClickItem(file)} key={file.$id} className="flex justify-between items-center">
                      <div className="flex items-center cursor-pointer gap-4">
                        <Thumbnail type={file.type} extension={file.extension} url={file.url} className="size-9 min-w-9" />
                        <p className="subtitle-2 line-clamp-1 text-light-100">{file.name}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="empty-result">No files found</p>
                )}
              </ul>
            )
          }
        </div>
    </div>
  )
}

export default Search
