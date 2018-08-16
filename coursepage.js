const addCheckBoxes = links => {
  for (let href_number = 0; href_number < links.length; href_number++) {
    let box = document.createElement("input");

    let att = document.createAttribute("type");
    att.value = "checkbox";
    box.setAttributeNode(att);

    let att1 = document.createAttribute("name");
    att1.value = "downloadSelect";
    box.setAttributeNode(att1);

    let att2 = document.createAttribute("value");
    att2.value = links[href_number].href;
    box.setAttributeNode(att2);

    let att3 = document.createAttribute("class");
    att3.value = "sexy-input";
    box.setAttributeNode(att3);

    let att4 = document.createAttribute("data-filename");
    att4.value = links[href_number];
    box.setAttributeNode(att4);

    links[href_number].parentNode.insertBefore(box, links[href_number]);
  }
};

const addButton = (referenceButton, buttonValue) => {
  let button = document.createElement("input");

  let att1 = document.createAttribute("type");
  att1.value = "button";
  button.setAttributeNode(att1);

  let att2 = document.createAttribute("class");
  att2.value = "btn btn-primary";
  button.setAttributeNode(att2);

  let att3 = document.createAttribute("name");
  att3.value = buttonValue;
  button.setAttributeNode(att3);

  let att4 = document.createAttribute("value");
  att4.value = buttonValue;
  button.setAttributeNode(att4);

  let att5 = document.createAttribute("style");
  att5.value = "padding:3px 16px;font-size:13px;background-color:black;";
  button.setAttributeNode(att5);

  referenceButton.parentNode.insertBefore(button, referenceButton.nextSibling);
};

const modifyPage = () => {
  // add selectAll checkbox

  let selectAll = document.createElement("input");
  let att1 = document.createAttribute("type");
  att1.value = "checkbox";
  selectAll.setAttributeNode(att1);
  let att2 = document.createAttribute("class");
  att2.value = "selectAll";
  selectAll.setAttributeNode(att2);

  let selectAllText = document.createElement("p");
  selectAllText.innerHTML = "Select All";

  let div = document.getElementsByClassName("table-responsive")[0];
  div.appendChild(selectAllText);
  div.appendChild(selectAll);

  // add checkboxes
  let links = document.getElementsByClassName("btn btn-link");

  addCheckBoxes(links);

  // add new buttons
  let oldButtons = document.getElementsByClassName("btn btn-primary");
  let prevButton = oldButtons[oldButtons.length - 1];
  let downloadAllButton = oldButtons[oldButtons.length - 1];
  downloadAllButton.innerHTML = "Download All Files";
  downloadAllButton.style["backgroundColor"] = "black";
  downloadAllButton.removeAttribute("href");

  addButton(prevButton, "Download Selected Files");

  newButtons = document.getElementsByClassName("btn btn-primary");
  let downloadSelectButton = newButtons[newButtons.length - 1];

  downloadSelectButton.addEventListener("click", downloadSelected, false);
  downloadAllButton.addEventListener("click", downloadAll, false);
  selectAll.addEventListener("click", selectAllLinks, false);

  // add credits
  let credsLocation = document.getElementsByClassName(
    "col-sm-12 col-md-11 col-md-offset-0"
  )[0];
  let credsText = document.createElement("p");
  credsText.innerHTML =
    "<center>CoursePage Download Manager- Made with ♥, Priyansh Jain</center>";
  credsLocation.appendChild(credsText);

  jQuery.unblockUI();
};

const selectAllLinks = () => {
  let links1 = document
    .getElementsByClassName("table")[1]
    .getElementsByClassName("sexy-input");
  let links2 = document
    .getElementsByClassName("table")[2]
    .getElementsByClassName("sexy-input");
  for (let i = 0; i < links1.length; i++) {
    links1[i]["checked"] = true;
  }
  for (let i = 0; i < links2.length; i++) {
    links2[i]["checked"] = true;
  }
};

const downloadAll = () => {
  let detailsTable = document
    .getElementsByClassName("table")[0]
    .getElementsByTagName("td");
  let course = detailsTable[7].innerText + "-" + detailsTable[8].innerText;
  let facultySlotName =
    detailsTable[12].innerText + "-" + detailsTable[11].innerText;
  facultySlotName = facultySlotName.replace(/[/]/g, "-");
  let links1 = document
    .getElementsByClassName("table")[1]
    .getElementsByClassName("sexy-input");
  let links2 = document
    .getElementsByClassName("table")[2]
    .getElementsByClassName("sexy-input");
  let selectedLinks = [];
  let linkTitles = [];
  for (let k = 0; k < links1.length; k++) {
    selectedLinks.push(links1[k].value);
    title = "";
    linkTitles.push(title);
  }
  for (let k = 0; k < links2.length; k++) {
    selectedLinks.push(links2[k].value);
    description =
      links2[k].parentElement.parentElement.previousElementSibling.innerText;
    date =
      links2[k].parentElement.parentElement.previousElementSibling
        .previousElementSibling.previousElementSibling.innerText;
    let title = (k + 1).toString() + "-" + description + "-" + date;
    title = title.replace(/[/:*?"<>|]/g, "_");
    linkTitles.push(title);
  }
  triggerDownloads([selectedLinks, linkTitles, course, facultySlotName]);
};

const downloadSelected = () => {
  let detailsTable = document
    .getElementsByClassName("table")[0]
    .getElementsByTagName("td");
  let course = detailsTable[7].innerText + "-" + detailsTable[8].innerText;
  let facultySlotName =
    detailsTable[12].innerText + "-" + detailsTable[11].innerText;
  facultySlotName = facultySlotName.replace(/[/]/g, "-");
  let links1 = document
    .getElementsByClassName("table")[1]
    .getElementsByClassName("sexy-input");
  let links2 = document
    .getElementsByClassName("table")[2]
    .getElementsByClassName("sexy-input");
  let selectedLinks = [];
  let linkTitles = [];
  for (let k = 0; k < links1.length; k++) {
    if (links1[k]["checked"]) {
      selectedLinkslinks.push(links1[k].value);
      title = "";
      linkTitles.push(title);
    }
  }
  for (let k = 0; k < links2.length; k++) {
    if (links2[k]["checked"]) {
      selectedLinks.push(links2[k].value);
      description =
        links2[k].parentElement.parentElement.previousElementSibling.innerText;
      date =
        links2[k].parentElement.parentElement.previousElementSibling
          .previousElementSibling.previousElementSibling.innerText;
      let title = (k + 1).toString() + "-" + description + "-" + date;
      title = title.replace(/[/:*?"<>|]/g, "_");
      linkTitles.push(title);
    }
  }
  triggerDownloads([selectedLinks, linkTitles, course, facultySlotName]);
};

const triggerDownloads = downloadList => {
  // alert("Contentscript is sending a message to background script: '" + contentScriptMessage  + "'");
  chrome.extension.sendMessage({
    message: downloadList
  });
};

chrome.runtime.onMessage.addListener((request, sender) => {
  // alert("Contentscript has received a message from from background script: '" + request.message + "'");
  if (request.message === "ClearCookie?") {
    try {
      if (
        document.getElementsByTagName("h1")[0].innerHTML === " Not Authorized "
      ) {
        chrome.extension.sendMessage({
          message: "YesClearCookiePls"
        });
      }
    } catch (error) {}
  } else if (request.message === "ReloadFacultyPage") {
    try {
      chrome.storage.local.get(["facultyHTML"], function(result) {
        if (!result) {
          throw new Error("Invalid");
        }
        jQuery("#page-wrapper").html(result.facultyHTML);
        jQuery.unblockUI();
      });
    } catch (error) {
      console.log("faced error", error);
    }
  } else if (request.message === "StoreFacultyPage") {
    try {
      let html = jQuery("#page-wrapper .container")[0].outerHTML;
      chrome.storage.local.set({ facultyHTML: html });
    } catch (error) {
      console.log("faced error", error);
    }
  } else if (request.message === "ShowLoading") {
    jQuery.blockUI({
      message: "<h1> Wait for it...</h1>"
    });
  } else {
    try {
      modifyPage();
    } catch (error) {
      console.log(error);
    }
  }
});
