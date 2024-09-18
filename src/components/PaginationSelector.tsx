import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
  stranica: number;
  stranice: number;
  onPageChange: (stranica: number) => void;
}

const PaginationSelector = ({ stranica, stranice, onPageChange }: Props) => {
  const brojeviStranica = [];
  for (let i = 1; i <= stranice; i++) {
    brojeviStranica.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {stranica !== 1 && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => onPageChange(stranica - 1)} />
          </PaginationItem>
        )}

        {brojeviStranica.map((broj) => (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => onPageChange(broj)} isActive={stranica === broj}>
              {broj}
            </PaginationLink>
          </PaginationItem>
        ))}

        {stranica !== brojeviStranica.length && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(stranica + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector;