export class DependentOptionsetTwoLevels {
    private cachedChildOptions: Xrm.Option<any>[];
    private cachedSubChildOptions: Xrm.Option<any>[];

    /**
     * Filters in cascade three optionset value: parent > first level child > second level child
     * The filter gets applied when initiating the service and onchange of the parent and first level child optionset.
     * @param parentControl parent/root control
     * @param childControl first level child control
     * @param subchildControl secon level children controls
     * @param dependentOptionsetTwoLevelsMappings Mapping JSON
     * @param sortOptions Sorts all values of the specified controls alphabetically
     */
    constructor(
        private parentControl: Xrm.OptionSetControl<any>,
        private childControl: Xrm.OptionSetControl<any>,
        private subchildControl: Xrm.OptionSetControl<any>,
        private dependentOptionsetTwoLevelsMappings: DependentOptionsetTwoLevelsMapping[],
        private sortOptions?: boolean
    ) {
        if (this.sortOptions) {
            this.sortOptionValues();
        }

        this.cachedChildOptions = childControl.getAttribute().getOptions();
        this.cachedSubChildOptions = subchildControl.getAttribute().getOptions();

        this.dependentOptionsetTwoLevelsMappings = dependentOptionsetTwoLevelsMappings;

        this.parentControl.getAttribute().addOnChange(() => {
            this.setChildDependentOptions();
        });

        this.childControl.getAttribute().addOnChange(() => {
            this.setSubchildDependentOptions();
        });
    }

    /**
     * Sorts all option-values of all controls alphabetically
     */
    private sortOptionValues() {
        const parentControlOptions = this.parentControl.getAttribute().getOptions().sort(this.sortAlphabetical);
        this.parentControl.clearOptions();
        for (const value of parentControlOptions) {
            this.parentControl.addOption(value);
        }

        const childControlOptions = this.childControl.getAttribute().getOptions().sort(this.sortAlphabetical);
        this.childControl.clearOptions();
        for (const value of childControlOptions) {
            this.childControl.addOption(value);
        }

        const subchildControlOptions = this.subchildControl.getAttribute().getOptions().sort(this.sortAlphabetical);
        this.subchildControl.clearOptions();
        for (const value of subchildControlOptions) {
            this.subchildControl.addOption(value);
        }
    }

    /**
     * sorts the option-values alphabetically
     */
    private sortAlphabetical(a: Xrm.Option<any>, b: Xrm.Option<any>) {
        if (a.text < b.text) return -1;
        else if (a.text > b.text) return 1;
        else return 0;
    }

    private setChildDependentOptions() {
        this.childControl.clearOptions();

        const parentValue: number | null | undefined = this.parentControl.getAttribute().getValue();

        if (!!parentValue) {
            const mappingChildren = this.dependentOptionsetTwoLevelsMappings.filter(
                (d) => d.parentValue == parentValue
            );

            if (mappingChildren) {
                const childrenList: Array<number | null> = [];

                mappingChildren.forEach((o) => {
                    o.dependencies.forEach((d) => {
                        childrenList.push(...d.childValues);
                    });
                });

                const dependentChildOptions = this.cachedChildOptions.filter((o) => {
                    return childrenList.includes(o.value);
                });

                if (this.sortOptions) {
                    dependentChildOptions.sort(this.sortAlphabetical);
                }

                dependentChildOptions.forEach((o) => this.childControl.addOption(o));
                this.evaluateSelection(this.childControl, childrenList);
            } else {
                this.childControl.getAttribute().setValue(null);
            }
        } else {
            this.childControl.getAttribute().setValue(null);
        }
        this.childControl.getAttribute().fireOnChange();
    }

    private setSubchildDependentOptions() {
        this.subchildControl.clearOptions();

        const parentValue: number | null | undefined = this.parentControl.getAttribute().getValue();
        if (!!parentValue) {
            const childValue = this.childControl.getAttribute().getValue();
            if (!!childValue) {
                const mappingSubChild = this.dependentOptionsetTwoLevelsMappings
                    .find((d) => d.parentValue == parentValue)
                    ?.dependencies.find((o) => {
                        return o.childValues.includes(childValue);
                    });

                if (mappingSubChild) {
                    const subchildrenList: Array<number | null> = [];
                    subchildrenList.push(...mappingSubChild.subchildValues);

                    const dependentsubChildOptions = this.cachedSubChildOptions.filter((o) => {
                        return subchildrenList.includes(o.value);
                    });

                    this.cachedSubChildOptions.filter((o) => {
                        return mappingSubChild.subchildValues.find((a) => {
                            a == o.value;
                        });
                    });

                    if (this.sortOptions) {
                        dependentsubChildOptions.sort(this.sortAlphabetical);
                    }

                    dependentsubChildOptions.forEach((o) => this.subchildControl.addOption(o));
                    this.evaluateSelection(this.subchildControl, mappingSubChild.subchildValues);
                } else {
                    this.childControl.getAttribute().setValue(null);
                }
            } else {
                this.subchildControl.getAttribute().setValue(null);
            }
        } else {
            this.childControl.getAttribute().setValue(null);
        }
        this.subchildControl.getAttribute().fireOnChange();
    }

    /**
     * Check if the selected value is included in the children-list
     * @param control Targetcontrol
     * @param mapping List of selectable values
     */
    private evaluateSelection(control: Xrm.OptionSetControl<any>, mapping: Array<number | null>) {
        const childValue = control.getAttribute().getValue();

        // excludes invalid values
        const validMapping = mapping.filter((x) => !!x);

        if (!validMapping.includes(childValue)) {
            // if there is no matching child and only one element available, automatically select
            // that element
            //
            // if there are no children available, clear the current selection
            if (validMapping.length === 1) {
                control.getAttribute().setValue(validMapping[0]);
            } else {
                control.getAttribute().setValue(null);
            }
        }
    }
}

export interface DependentOptionsetTwoLevelsMapping {
    parentValue: number;
    dependencies: [
        {
            childValues: Array<number | null>;
            subchildValues: Array<number | null>;
        }
    ];
}
