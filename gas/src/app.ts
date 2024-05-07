
declare let global: any;
global.onFromSubmit = (e: GoogleAppsScript.Events.FormsOnFormSubmit) => {
  console.log(e);
};