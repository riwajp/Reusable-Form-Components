import SelectInput from "./SelectInput";

const SelectForms = ({ name, data, form_context }) => {
  const select_names = data.map((d) => d.name);
  return (
    <div>
      {data.map((d, i) => (
        <SelectInput
          key={i}
          name={d.name}
          label={d.name}
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
