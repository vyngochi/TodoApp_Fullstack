import { Modal } from "antd";
import AddTaskCalendar from "../common/AddTaskCalendar";

interface ChooseDueDatePopupProps {
  isOpenModal: boolean;
  setIsOpenModal: (v: boolean) => void;
  selected: Date | undefined;
  setSelected: (v: Date | undefined) => void;
  onAccept: () => void;
}
export default function ChooseDueDatePopup({
  isOpenModal,
  setIsOpenModal,
  selected,
  setSelected,
  onAccept,
}: ChooseDueDatePopupProps) {
  const handleOk = () => {
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Modal
        closeIcon={false}
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        style={{
          display: "flex",
          justifyContent: "center",
          top: "5%",
        }}
      >
        <AddTaskCalendar
          onAccept={onAccept}
          selected={selected}
          setSelected={setSelected}
        />
      </Modal>
    </>
  );
}
