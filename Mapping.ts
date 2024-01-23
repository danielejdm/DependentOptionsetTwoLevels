import { DependentoptionsetTwoLevelsMapping } from "./DependentOptionSetTwoLevel";

export const Mapping = <DependentOptionsetTwoLevelsMapping[]>[
    {
        parentValue: optionset1.option1,
        dependencies: [
            {
                childValues: [
                    optionset2.option1
                ],
                subchildValues: [
                    optionset3.option1
                ]
            }
        ]
    },
    {
        parentValue: optionset1.option2,
        dependencies: [
            {
                childValues: [
                    optionset2.option1
                ],
                subchildValues: [
                    optionset3.option1
                ]
            }
        ]
    },
    {
        parentValue: optionset1.option3,
        dependencies: [
            {
                childValues: [
                    optionset2.option1
                ],
                subchildValues: [
                    optionset3.option1,
                    optionset3.option2,
                    optionset3.option3,
                    optionset3.option4,
                    optionset3.option5,
                ]
            }
        ]
    },
    {
        parentValue: optionset1.option4,
        dependencies: [
            {
                childValues: [
                    optionset2.option1
                ],
                subchildValues: [
                    optionset3.option6,
                    optionset3.option7,
                    optionset3.option8,
                ]
            },
            {
                childValues: [
                    optionset2.option2
                ],
                subchildValues: [
                    optionset3.option6, 
                    optionset3.option7
                ]
            },
            {
                childValues: [
                    optionset2.option3
                ],
                subchildValues: [
                    optionset3.option8,
                    optionset3.option9,
                    optionset3.option10
                ]
            },
            {
                childValues: [
                    optionset2.option4
                ],
                subchildValues: [
                    optionset3.option1,
                    optionset3.option11,
                    optionset3.option12
                ]
            },
        ]
    },
    {
        parentValue: optionset1.option5,
        dependencies: [
            {
                childValues: [
                    optionset2.option1, 
                    optionset2.option5
                ],
                subchildValues: [
                    optionset3.option1,
                    optionset3.option2,
                    optionset3.option13
                ]
            }
        ]
    }
];
