import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState
} from "@tanstack/react-table"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Plus, Search } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  role: "Admin" | "User" | "Editor"
  status: "Active" | "Inactive"
  lastLogin: string
}

const data: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-03-20" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-03-21" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive", lastLogin: "2024-03-15" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", lastLogin: "2024-03-22" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "User", status: "Inactive", lastLogin: "2024-03-10" },
  { id: "6", name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active", lastLogin: "2024-03-23" },
  { id: "7", name: "Ethan Hunt", email: "ethan@example.com", role: "Editor", status: "Active", lastLogin: "2024-03-24" },
]

const UserPage = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button 
          variant="ghost" 
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium ml-4">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
          {row.getValue("role")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-semibold",
            status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
          )}>
            {status}
          </span>
        )
      }
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
    },
    {
      id: "actions",
      cell: () => (
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground text-sm">Manage your team members and their roles.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"
export default UserPage
