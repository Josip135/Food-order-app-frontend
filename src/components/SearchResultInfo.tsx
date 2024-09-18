import { Link } from "react-router-dom";

type Props = {
  total: number;
  grad: string;
}

const SearchResultInfo = ({ total, grad }: Props) => {
  return (<div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
    <span>
      {total} restorana pronađeno u gradu {grad}
      <Link to="/" className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Promijeni lokaciju</Link>
    </span>

  </div>)
}

export default SearchResultInfo;