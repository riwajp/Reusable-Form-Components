import SelectInput from "./SelectInput";

const SelectForms = ({ data, form_context, render }) => {
  const select_names = data.map((d) => d.name);
  return (
    <div>
      {data.map((d, i) => (
        <SelectInput
          key={i}
          label={d.label}
          name={d.name}
          options={d.options.map((o) => ({
            label: o.label,

            value: o.value,
          }))}
          dependency={select_names.slice(0, i)}
          form_context={form_context}
          render={render}
        />
      ))}
    </div>
  );
};

export default SelectForms;
