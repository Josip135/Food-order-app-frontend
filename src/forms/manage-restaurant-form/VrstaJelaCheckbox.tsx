import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../../components/ui/form";
import { Checkbox } from "../../components/ui/checkbox";

type Props = {
  jelo: string,
  field: ControllerRenderProps<FieldValues, "vrsteJela">;
};

const VrstaJelaCheckbox = ({ jelo, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(jelo)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, jelo]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== jelo));
            }
          }} />
      </FormControl>
      <FormLabel className="text-sm font-normal">{jelo}</FormLabel>
    </FormItem>
  );
}

export default VrstaJelaCheckbox;