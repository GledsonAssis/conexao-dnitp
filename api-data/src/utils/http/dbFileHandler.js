import HttpStatus from "http-status-codes";
import { notFoundErrorHandler } from "../../middlewares";

/**
 * Database handler returning image
 *
 * @param {object} image
 * @param {object} req
 * @param {object} res
 */
export default (req, res) => (data) => {
  if (data) {
    const {
      file,
      mime: { media, suffix },
      name,
    } = data;

    const regex = new RegExp(suffix, "g");
    const filename = name.replace(regex, "") + suffix;

    res.header("Access-Control-Expose-Headers", "Content-Disposition");
    res.set("Content-Disposition", `attachment; filename="${filename}"`);
    res.set("Content-Type", media);
    res.status(HttpStatus.OK).send(file);
  } else {
    notFoundErrorHandler(req, res);
  }
};
