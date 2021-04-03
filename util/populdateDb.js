/**
 * Method to standardize creating text
 * @param {string} text
 * @param {boolean} isComplete
 * @param {number} minTimeFromTarget
 * @param {number} maxTimeFromTarget
 */

function createListItem(
  text = "",
  isComplete = false,
  minTimeFromTarget = 0,
  maxTimeFromTarget = 0
) {
  return {
    text,
    isComplete,
    minTimeFromTarget,
    maxTimeFromTarget,
  };
}

/**
 * Method to standardize creating a list
 * @param {string} name
 * @param {string} targetDate
 * @param {{}} tasks
 */

function createList(
  name = "Example List",
  targetDate = "2022-01-01T00:00:00",
  tasks = {}
) {
  return {
    name,
    targetDate,
    tasks,
  };
}

/**
 * Method to standardize creating a user
 * @param {string} email
 * @param {item[]} checklists
 */

function createUser(email = "example@gmail.com", checklists = []) {
  return {
    email,
    checklists,
  };
}
