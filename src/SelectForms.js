import SelectInput from "./SelectInput";

const SelectForms = ({ name, data, form_context, renderEach }) => {
  const select_names = data.map((d) => name + "." + d.name);
  return (
    <div>
      {data.map((d, i) => (
        <SelectInput
          key={i}
          label={d.label}
          name={name + "." + d.name}
          options={d.options.map((o) => ({
            label: o.label,

            value: o.value,
          }))}
          dependency={select_names.slice(0, i)}
          form_context={form_context}
          render={renderEach}
        />
      ))}
    </div>
  );
};

export default SelectForms;
