import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classnames from "classnames";
import { Delivery } from "../services/deliveries/interfaces";
import styles from './table.module.scss';

interface Props {
  deliveries: Delivery[]
  className?: string;
}

export function Table(props: Props) {
  const table = useReactTable({
    data: props.deliveries,
    columns: [{
      header: "Nome",
      cell: (ctx) => <span>{ctx.row.original.customer.name}</span>
    }, {
      header: "Rua",
      cell: (ctx) => <span>{ctx.row.original.street}</span>
    }, {
      header: "Cidade",
      cell: (ctx) => <span>{ctx.row.original.city}</span>
    }, {
      header: "País",
      cell: (ctx) => <span>{ctx.row.original.country}</span>
    }, {
      header: "Peso",
      cell: (ctx) => <span>{ctx.row.original.weight}</span>
    }, {
      header: "Lat",
      cell: (ctx) => <span>{ctx.row.original.latitude}</span>
    }, {
      header: "Lng",
      cell: (ctx) => <span>{ctx.row.original.longitude}</span>
    }],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={classnames(props.className, styles.table)}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              <td>
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
