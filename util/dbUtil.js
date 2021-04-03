export function createTask(
  task = "",
  description = "",
  startWindowInDays = 0,
  endWindowInDays = 0,
  resources = [],
  dateCompleted = "",
  timeCompleted = ""
) {
  return {
    task,
    description,
    startWindowInDays,
    endWindowInDays,
    resources,
    dateCompleted,
    timeCompleted,
  };
}

export function createList(
  name = "Example List",
  type = "Example List Type",
  eventDate = "01-01-01",
  tasks = {}
) {
  return {
    name,
    type,
    eventDate,
    tasks,
  };
}

export function createUser(email = "example@gmail.com", checklists = []) {
  return {
    email,
    checklists,
  };
}
