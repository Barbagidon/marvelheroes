import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";

import "./charSearchForm.scss";
import MarvelService from "../../services/MarvelService";
import CreateContent from "../../hooks/createContent";

const CharSearchForm = () => {
  const { updateChar, chars, showMessage, firstLoading } = CreateContent();
  const { getCharacter, loading } = MarvelService();

  const schema = Yup.object({
    charName: Yup.string()
      .required(
        <div className="char__search-error">This field is required</div>
      )
      .min(2, <div className="char__search-error">Name is too short</div>),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const { charName } = data;
    updateChar(getCharacter, charName);
  };

  const erLog = () => {
    console.log(errors);
  };

  const message = (chars) => {
    let result;
    if (chars) {
      const [{ name }] = chars;
      result = (
        <>
          <div className="char__search-success">
            There is {name}! Visit page?
            {errors?.charName?.message}
          </div>

          <Link to={`/${name}`}>
            <button
              onClick={erLog}
              type="submit"
              className="button button__secondary"
              style={{
                marginTop: "10px",
              }}
            >
              <div className="inner">To page</div>
            </button>
          </Link>
        </>
      );
    } else {
      result = (
        <div className="char__search-error">
          <p> The character was not found. Check the name and try again</p>
          <p>{errors?.charName?.message}</p>
        </div>
      );
    }

    return result;
  };

  const spinner = loading && firstLoading ? <Spinner /> : null;

  return (
    <div className="char__search-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="char__search-label" htmlFor="charName">
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          <input
            {...register("charName")}
            type="text"
            placeholder="Enter name"
          />
          <button onClick={erLog} type="submit" className="button button__main">
            <div className="inner">find</div>
          </button>
          {showMessage && !loading ? message(chars) : errors?.charName?.message}
        </div>

        {spinner}
      </form>
    </div>
  );
};

export default CharSearchForm;
