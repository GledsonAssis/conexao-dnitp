import HttpStatus from "http-status-codes";
import genericErrorHandler from "./genericErrorHandler";

export default (req, res) => (error) => {
  if (
    !error.message.includes("scopeWithActivities") &&
    !error.message.includes("skillWithActivities")
  ) {
    throw error;
  }

  const parsedError = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    details: error,
    message: "Registro possui dependência e não pode ser deletado.",
    messageToken: "scopeWithActivities",
  };

  genericErrorHandler(parsedError, req, res);
};
