import React from "react";

function VAlid() {}

const Form = ({ Options, Fields, state, handler }) => {
  return (
    <div className="col-md-7 mb-md-0 mb-4 px-md-5">
      <div className="row mb-3 ">
        <label
          htmlFor="colFormLabelSm"
          className="col-md-3 col-form-label col-form-label-md"
        >
          Amount *
        </label>

        <div className="col-md-9">
          <select
            className="form-select shadow-none"
            aria-label="Default select example"
            value={"$" + state.amount}
            name="amount"
            id="amount"
            onChange={(e) => handler(e)}
          >
            <option selected value={0}>
              Select amount
            </option>
            {Options.map((e) => (
              <option key={e.id} value={e.amount}>
                {typeof e.amount === Number ? e.amount : e.amount}
              </option>
            ))}
          </select>
        </div>
      </div>

      {Fields.map((e) => {
        return (
          <div className="row mb-3 " key={e.id}>
            <label
              htmlFor="colFormLabelSm"
              className="col-md-3 col-form-label col-form-label-md"
            >
              {e.title}
            </label>

            <div className="col-md-9">
              <input
                pattern={
                  e.name === "email"
                    ? "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                    : ""
                }
                value={state[e.name]}
                name={e.name}
                id={e.name}
                onChange={(e) => handler(e)}
                type={e.type}
                className="form-control form-control-md shadow-none"
                placeholder={e.title}
              />
            </div>
          </div>
        );
      })}

      <div className="row">
        <label
          htmlFor="colFormLabelSm"
          className="col-md-3 col-form-label col-form-label-md"
        >
          Message *
        </label>

        <div className="col-md-9">
          <textarea
            value={state.message}
            onChange={(e) => handler(e)}
            name="Message"
            className="form-control shadow-none"
            placeholder="Leave a comment here"
            id="Message"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
