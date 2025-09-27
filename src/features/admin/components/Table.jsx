export const Table = ({ columns, data, actions }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="p-3">
              {col}
            </th>
          ))}
          {actions && <th className="p-3 text-right">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {row.map((cell, j) => (
              <td key={j} className="p-3">
                {cell}
              </td>
            ))}
            {actions && <td className="p-3 text-right">{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
