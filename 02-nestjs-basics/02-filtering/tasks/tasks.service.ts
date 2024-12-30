import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { QueryParams, Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];
  private rows = this.tasks.length;
  private result: Task[] = [];

  getFilteredTasks(query: QueryParams): Task[] {
    const isNotQueryParams =  !Object.keys(query).length;

    if (isNotQueryParams) {
      return this.tasks;
    }

    if (query.limit) {
      this.rows = query.limit;
    }

    if (query.status) {
      this._filterByStatus(query.status);
    }

    if (query.page) {
      this._currentPageData(query.page, query.status);
    }

    if (query.sortBy) {
      this._sortByField(query.sortBy);
    }

    return this.result;
  }

  private _sortByField(sortBy: QueryParams['sortBy']) {
    const arr = this._getCurrentArray(!!this.result.length);
    this.result = arr.sort(this._sort(sortBy));
  }

  private _currentPageData(page: QueryParams['page'], status?: TaskStatus) {
    const start = (this.rows * page) - this.rows;
    const end = start + this.rows;
    const arr = this._getCurrentArray(!!status);
    this.result = arr.slice(start, end);
  }

  private _filterByStatus(status: TaskStatus) {
    this.result = this.tasks.filter(item => item.status === status);

    if (!this.result.length) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Такого элемента не существует',
      }, HttpStatus.NOT_FOUND);
    }
  }

  private _sort(sortBy: QueryParams['sortBy']) {
    return (a: Task, b: Task) => a[sortBy].localeCompare(b[sortBy]);
  }

  private _getCurrentArray(condition: boolean) {
    return condition ? this.result : this.tasks;
  }
}
