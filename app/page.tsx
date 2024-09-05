import Link from "next/link";
import { db } from "./db/inde";

export default async function Home() {
  const snipets = await db.snippet.findMany()
  const renderSnippets = snipets.map((snippet)=> {
    return <Link href={`snippets/${snippet.id}`} key={snippet.id} className="flex justify-between items-center p-2 border rounded hover:bg-slate-200">
      {snippet.title}
      <div>View</div>
    </Link>
  })
  return (<>
    <div className="flex hover:bg-slate-200 justify-between mb-10"> 
      <h1 className="text-xl font-bold ">Snippets</h1>
      <Link className="border p-2 rounded " href={"snippets/new"} >New</Link>
    </div>
    <div className="flex flex-col gap-2">{renderSnippets}</div>
    
    </>
  );
}
