import { Alert } from "flowbite-react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { handleAlert } from "../../store/reducers/alert";

const Index = ({ alertInfo }) => {
  const { type, msg, visibility } = alertInfo;
  let alertColor;
  const dispatch = useDispatch();
  const allertEl = useRef();

  switch (type) {
    case "success": {
      alertColor = "success";
      break;
    }
    case "failure": {
      alertColor = "failure";
      break;
    }
    case "warning": {
      alertColor = "warning";
      break;
    }
    default:
      alertColor = "success";
  }
  useEffect(() => {
    if (type) {
      allertEl.current.classList.remove("translate-x-96");
      allertEl.current.classList.add("translate-x-0");
      // allertEl.current.classList.add();
      setTimeout(() => {
        allertEl.current.classList.remove("translate-x-0");
        allertEl.current.classList.add("translate-x-96");
        dispatch(handleAlert({ type: "", msg: "" }));
      }, 4000);
    }
  }, [type]);

  console.log(alertInfo);

  return (
    <div
      className="fixed top-[10%] transition-all right-[1%]  translate-x-96"
      ref={allertEl}
    >
      <Alert color={alertColor} withBorderAccent={true}>
        <span className="font-medium">{msg ? msg : "ssssssss"}</span>
      </Alert>
    </div>
  );
};

export default Index;
