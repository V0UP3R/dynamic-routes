export async function TableRows({data, columns, rowsPerPage, currentPage}:{data: { [key: string]: string | number; }[], columns: string[]; rowsPerPage:number; currentPage:number}){
  
  const currentData = data && data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  
  return(
    (data && currentData.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className={`border-t border-gray-300 ${rowIndex % 2 === 0 ? 'bg-gray-100' : ''}`}
      >
        {data && columns.map((column, colIndex) => (
          <td key={colIndex} className="py-2 px-6">
            {row[column]}
          </td>
        ))}
      </tr>
    )))
  )
}