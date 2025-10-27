import { useMemo } from 'react';
type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const createBtnConfig = (currentPage: number, totalPages: number) => {
    const MAX_BTNS = 5;
    const BTNS_EACH_SIDE = Math.floor(MAX_BTNS / 2);
    let start = Math.max(1, currentPage - BTNS_EACH_SIDE);
    let end = start + MAX_BTNS - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - MAX_BTNS + 1);
    }

    const config = [];
    for (let i = start; i <= end; i++) {
      config.push({ page: i, current: i === currentPage });
    }
    return config;
  };

  const numberedBtnsConfig = useMemo(() => {
    return createBtnConfig(currentPage, totalPages);
  }, [currentPage, totalPages]);

  return (
    <nav className="pagination flex-row just-cntr align-cntr">
      <button
        className="btn-page"
        type="button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >{`<`}</button>
      {numberedBtnsConfig.map((btn, i) => (
        <button
          className={`btn-page ${btn.current ? 'current' : ''}`}
          key={i}
          onClick={() => onPageChange(btn.page)}
          disabled={btn.current}
        >
          {btn.page}
        </button>
      ))}
      <button
        className="btn-page"
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >{`>`}</button>
    </nav>
  );
}

export default Pagination;
