export interface FunctionalFormButtonBaseProps {
  buttonText: string;
  isSubmitInProgress: boolean;
  formCurrentStep: number;
  formLastStep: number;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
}
export interface FunctionalFormButtonDirectableProps
  extends FunctionalFormButtonBaseProps {
  isDirectable: true;
  buttonDirection: ButtonDirections;
}
export interface FunctionalFormButtonNotDirectableProps
  extends FunctionalFormButtonBaseProps {
  isDirectable?: false;
  buttonDirection?: never;
}

export type FunctionalFormButtonProps =
  | FunctionalFormButtonDirectableProps
  | FunctionalFormButtonNotDirectableProps;
