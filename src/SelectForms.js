import SelectInput from "./SelectInput";

const SelectForms = ({ data, form_context, label }) => {
  const select_names = data.map((d) => d.name);
  return (
    <div>
      {data.map((d, i) => (
        <SelectInput
          key={i}
          name={d.name}
          label={label ? label(d.name) : null}
          options={d.options.map((o) => ({
            label: o.label,

            value: o.value,
          }))}
          dependency={select_names.slice(0, i)}
          form_context={form_context}
        />
      ))}
    </div>
  );
};

export default SelectForms;
