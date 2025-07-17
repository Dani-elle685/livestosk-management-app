import React from 'react'

interface ConfirmTableProps {
    data: Record<string, any>
}

export const ConfirmTable = ({ data }: ConfirmTableProps) => {
    return (
        <div>
            <table className="w-full border-collapse">
                <tbody>
                    {Object.entries(data).map(([key, value]) => (
                        <tr key={key} className="border-b">
                            <td className="py-2 px-4 font-xs font-normal">{key} :</td>
                            <td className="py-2 px-4 font-sm font-medium">
                                {React.isValidElement(value) ? value : String(value)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
} 