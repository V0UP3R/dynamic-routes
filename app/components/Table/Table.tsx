'use client'
import { fetcher } from '@/app/actions/fetcher';
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

interface TableProps {
  data: { count: number; results: { [key: string]: string | number }[] };  
  columns: string[];  
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataState, setDataState] = useState(data.results);

  const totalPages = Math.ceil(data.count / rowsPerPage);
  const currentData = dataState.slice(0, rowsPerPage);

  const fetchData = async (page: number, rowsPerPage: number) => {
    const dataReturn = await fetcher(rowsPerPage, page);
    setDataState(dataReturn.results);
  };
  
  const handlePageChange = async (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      await fetchData(page, rowsPerPage);
    }
  };

  const handleRowsPerPageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);  
    await fetchData(1, newRowsPerPage);
  };

  return (
    <div className="w-full">
      <div className="flex justify-start items-center mb-4">
        <div>
          <label htmlFor="rowsPerPage" className="mr-2">Mostrar:</label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-300">
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          <table className="min-w-full bg-white">
            <thead className="sticky top-0 bg-gray-800 bg-opacity-50 backdrop-blur text-white">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="py-3 px-6 text-left font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-t border-gray-300 ${rowIndex % 2 === 0 ? 'bg-gray-100' : ''}`}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-2 px-6">
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between w-1/2 gap-2 items-center mt-4">
        <div className="mt-4 text-gray-600">
          Mostrando {currentData.length} de {data.count} registros
        </div>
        <div className="flex justify-center gap-2 items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700 text-white rounded-full hover:bg-gray-400 duration-500 focus:outline-none cursor-pointer"
          >
            <IoIosArrowDropleftCircle className='w-5 h-5' />
          </button>

          <span>{currentPage} de {totalPages}</span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-700 text-white rounded-full hover:bg-gray-400 duration-500 focus:outline-none cursor-pointer"
          >
            <IoIosArrowDroprightCircle className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
