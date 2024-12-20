import { Task, TaskStatus } from "./task.model";

const statusList = Object.keys(TaskStatus).map(item => item.toLowerCase());
const minLengthTitle = 3;
const minLengthDescription = 5;

function isEnum(value, entity) {
    const enumValues = Object.keys(entity).map(function (k) { return entity[k]; });
    return enumValues.indexOf(value) >= 0;
}

function checkLength(value, count) {
    if (value?.length === undefined) {
        return 'Поле обязательно для заполнения';
    }

    if (Number(value?.length) < count) {
        return `Строка не должна быть меньше ${count} символов`;
    }

    return false;
}

export const validateTask = (task: Task) => {
    const checkEnum = isEnum(task.status, TaskStatus);
    const checkTitleLength = checkLength(task.title, minLengthTitle);
    const checkDescriptionLength = checkLength(task.description, minLengthDescription);
    const isError = !checkEnum || !!checkTitleLength || !!checkDescriptionLength;

    if (isError) {
        return {
            isError,
            fields: {
                ...(!checkEnum && { status: `Поле должно быть одним из статусов: ${statusList}`}),
                ...(checkTitleLength && { title: checkTitleLength}),
                ...(checkDescriptionLength && { description: checkDescriptionLength}),
            }
        }
    }
}
