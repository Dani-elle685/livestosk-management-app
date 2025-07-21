import React from "react";
import { CircleCheck, CircleX, Pencil } from "lucide-react";
import { LivestockDialog } from "../../forms/LivestockDialog";
import { LivestockVaccine } from "@/infrastructure/vaccine/dto/vaccine.dto";
import { ConfirmTable } from "@/components/reusable-components/deleteTableComponent";
import CreateVaccineForm from "../form/create.vaccine.form";
import DeleteVaccine from "../form/delete.vaccine";
import ConfirmVaccineAdministration from "../form/confirm.administration";

interface Props {
  vaccine: LivestockVaccine;
}

const VaccineTableActions: React.FC<Props> = ({ vaccine }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const isCompleted = vaccine?.status?.toLowerCase() === "completed";

  return (
    <div className="flex items-center gap-2">
      <LivestockDialog
      
        trigger={
          <CircleCheck
            className={`${
              isCompleted ? "text-gray-400 cursor-not-allowed" : "text-green-600 cursor-pointer"
            }`}
            height={16}
            width={16}
          />
        }
        open={openConfirm}
        onOpenChange={(open) => !isCompleted && setOpenConfirm(open)}
      >
        <ConfirmVaccineAdministration vaccine={vaccine} onClose={()=>setOpenConfirm(false)}/>
      </LivestockDialog>

      <LivestockDialog
      title="Edit Vaccine"
      description="Edit the vaccine details."
        trigger={
          <Pencil
            className={`${
              isCompleted ? "text-gray-400 cursor-not-allowed" : "text-blue-600 cursor-pointer"
            }`}
            height={16}
            width={16}
          />
        }
        open={openEdit}
        onOpenChange={(open) => !isCompleted && setOpenEdit(open)}
        className="rounded-md"
      >
        <CreateVaccineForm vaccine={vaccine} onSuccess={()=>setOpenEdit(false)}/>
      </LivestockDialog>

      <LivestockDialog
        trigger={
          <CircleX
            className={`${
              isCompleted ? "text-gray-400 cursor-not-allowed" : "text-red-600 cursor-pointer"
            }`}
            height={16}
            width={16}
          />
        }
        open={openDelete}
        onOpenChange={(open) => !isCompleted && setOpenDelete(open)}
        className="rounded-md"
      >
        <DeleteVaccine vaccine={vaccine} onClose={()=>setOpenDelete(false)}/>
      </LivestockDialog>
    </div>
  );
};

export default VaccineTableActions;
