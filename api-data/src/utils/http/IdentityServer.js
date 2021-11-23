import fetch from "node-fetch";
import qs from "qs";

import handleResponse from "./handleResponse";

const createUser = ({ confirmPassword, email, password }) =>
  handleResponse(
    fetch(`${process.env.AUTH_API__URL}/account/register`, {
      method: "POST",
      body: qs.stringify({
        confirmPassword,
        email,
        password,
      }),
      headers: {
        Authorization: process.env.AUTH_API__AUTHORIZATION_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  );

const updateUser = ({ idIdentityServer, confirmPassword, email, password }) =>
  handleResponse(
    fetch(`${process.env.AUTH_API__URL}/account/${idIdentityServer}`, {
      method: "PUT",
      body: qs.stringify({
        confirmPassword,
        email,
        password,
      }),
      headers: {
        Authorization: process.env.AUTH_API__AUTHORIZATION_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  );

const userInfo = (token) =>
  handleResponse(
    fetch(`${process.env.AUTH_API__URL}/user`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  );

const generateConfirmationToken = (email) =>
  handleResponse(
    fetch(`${process.env.AUTH_API__URL}/account/GenerateConfirmationToken`, {
      method: "POST",
      body: qs.stringify({
        email,
      }),
      headers: {
        Authorization: process.env.AUTH_API__AUTHORIZATION_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  );

const releaseAccess = (email, confirmationToken) =>
  handleResponse(
    fetch(`${process.env.AUTH_API__URL}/account/ConfirmEmailManual`, {
      method: "POST",
      body: qs.stringify({
        email,
      }),
      headers: {
        Authorization: process.env.AUTH_API__AUTHORIZATION_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
        "Confirmation-Token": confirmationToken,
      },
    })
  );

export default {
  createUser,
  updateUser,
  userInfo,
  releaseAccess,
  generateConfirmationToken,
};
