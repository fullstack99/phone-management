import { createContext } from "react";
import axios from "axios";

import {
  SET_CONTACT_LIST,
  DELETE_CONTACT_LIST,
  UPDATE_CONTACT_LIST,
  CREATE_CONTACT_LIST,
  SET_LOADING,
  SET_ERROR,
} from "./types";
import CreateDataContext from "./CreateDataContext";

export const ContactContext = createContext();
const BASE_API = "http://localhost:4000/api/";

const initialState = {
  contacts: [],
  loading: false,
  loaded: false,
  error: null,
};

const setLoading = (dispatch, loading) => {
  dispatch({
    type: SET_LOADING,
    payload: { loading },
  });
};

const getContacts = (dispatch) => async () => {
  const path = `${BASE_API}contacts`;
  try {
    dispatch({
      type: SET_ERROR,
      payload: null,
    });
    setLoading(dispatch, true);
    const { data } = await axios.get(path);
    dispatch({
      type: SET_CONTACT_LIST,
      payload: data.contacts,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  } finally {
    setLoading(dispatch, false);
  }
};

const deleteContact = (dispatch) => async (id) => {
  const path = `${BASE_API}contacts/${id}`;
  try {
    dispatch({
      type: SET_ERROR,
      payload: null,
    });
    setLoading(dispatch, true);
    await axios.delete(path);
    dispatch({
      type: DELETE_CONTACT_LIST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  } finally {
    setLoading(dispatch, false);
  }
};

const updateContact =
  (dispatch) =>
  async ({ id, contact }) => {
    const path = `${BASE_API}contacts/${id}`;
    try {
      dispatch({
        type: SET_ERROR,
        payload: null,
      });
      setLoading(dispatch, true);
      const { data } = await axios.put(path, contact);
      dispatch({
        type: UPDATE_CONTACT_LIST,
        payload: { data: data.contact },
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    } finally {
      setLoading(dispatch, false);
    }
  };

const createContact = (dispatch) => async (info) => {
  const path = `${BASE_API}contacts`;
  try {
    dispatch({
      type: SET_ERROR,
      payload: null,
    });
    setLoading(dispatch, true);
    const { data } = await axios.post(path, info);
    dispatch({
      type: CREATE_CONTACT_LIST,
      payload: data.contact,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  } finally {
    setLoading(dispatch, false);
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      const { loading } = action.payload;
      return {
        ...state,
        loading,
      };
    case SET_CONTACT_LIST:
      return {
        ...state,
        contacts: action.payload,
        loaded: true,
      };
    case CREATE_CONTACT_LIST: {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loaded: true,
      };
    }

    case DELETE_CONTACT_LIST:
      return {
        ...state,
        contacts: state.contacts.filter((v) => v.id !== action.payload),
        loaded: true,
      };
    case UPDATE_CONTACT_LIST:
      return {
        ...state,
        contacts: state.contacts.map((v) =>
          v._id === action.payload.id ? action.payload.data : v
        ),
        loaded: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const dispatch = (dispatch) => async (action) => dispatch(action);

export const { Provider, Context } = CreateDataContext(
  reducer,
  {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    dispatch,
  },
  initialState
);
