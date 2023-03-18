import { useEffect } from "react";

const ShowToast = ({ message, type, visible, setVisible }) => {
  useEffect(() => {
    if (visible.visible) {
      setTimeout(() => {
        setVisible({
          visible: false,
        });
      }, 5000);
    }
  }, [visible.visible]);

  return (
    <div class={visible.visible ? "toast" : "toast hidden"}>
      <div class="alert alert-info bg-white border-red-400 shadow-lg">
        <div>
          <span>{visible.message}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowToast;
