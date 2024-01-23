import { DependentOptionsetTwoLevels } from "./DependentOptionSetTwoLevel";
import { MappingKategorieToKategorie2ToTyp } from "./Mapping";

public setDependentOptionSetTwoLevels = (): void => {
    new DependentOptionsetTwoLevels(
        this.formContext.getControl("optionset1"),
        this.formContext.getControl("optionset2"),
        this.formContext.getControl("optionset3"),
        Mapping
    );
};

public setDependentOptionSetTwoLevelsOrdered = (): void => {
    new DependentOptionsetTwoLevels(
        this.formContext.getControl("optionset1"),
        this.formContext.getControl("optionset2"),
        this.formContext.getControl("optionset3"),
        Mapping,
        true
    );
};
