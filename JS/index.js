var SiteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkUrl");
var submitBtn = document.getElementById("submitBtn");
var editBtn = document.getElementById("editBtn");
var tbody = document.getElementById("tableContent");
var ovarlaymn = document.querySelector(".overlay");
var closebtn = document.querySelector(".close-icon i");
var allSite;
var pSite = 0;
if (localStorage.getItem("webSite") == null) {
  allSite = [];
} else {
  allSite = JSON.parse(localStorage.getItem("webSite"));
  display();
}

function addWebsite() {
  if (
    vaild() &&
    vaildUrl() 
  ) {
    var webSite = {
      name:SiteName.value,
      url: siteUrl.value,
    };
    allSite.push(webSite);
    localStorage.setItem("webSite", JSON.stringify(allSite));
    siteUrl.classList.add("is-valid");
    SiteName.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    SiteName.classList.remove("is-invalid");

    clear();
    display();

  } else {
    SiteName.style.color = "red";
    siteUrl.style.color = "red";
    SiteName.style.borderColor = "red";
    SiteName.style.borderWidth = "2px";
    siteUrl.style.borderColor = "red";
    siteUrl.style.borderWidth = "2px";
    siteUrl.classList.remove("is-valid");
    SiteName.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
    SiteName.classList.add("is-invalid");
    ovarlaymn.classList.add("appear");
  }
}

function clear() {
  SiteName.value = null;
  siteUrl.value = null;
}

function display() {
  var box = ``;
  for (var i = 0; i < allSite.length; i++) {
    box += `<tr>
        <th class="text-capitalize">${i + 1}</th>
        <th class="text-capitalize">${allSite[i].name}</th>
        <th><button type="button" class="btn btn-success" id="visit" onclick="visititem(${i})">
        <i class="fa-solid fa-eye"></i>
        Visit</button></th>
        <th><button type="button" class="btn btn-warning" id="edit" onclick="editWebsite(${i})"">
        <i class="fa-solid fa-wrench"></i>
        Update</button></th>
        <th><button type="button" class="btn btn-danger" id="delete"  onclick="deleteSite(${i})"">
        <i class="fa-solid fa-trash-can"></i>
        Delete</button></th>
        </tr>`;
  }
  tbody.innerHTML = box;
}

function deleteSite(index) {
  allSite.splice(index, 1);
  localStorage.setItem("webSite", JSON.stringify(allSite));
  display();
}

function editWebsite(index) {
  pSite = index;
  SiteName.value = allSite[index].name;
  siteUrl.value = allSite[index].url;
  editBtn.classList.replace("d-none", "d-block");
  submitBtn.classList.replace("d-block", "d-none");
}

function updateSite() {
    if (
        vaild() &&
        vaildUrl() 
      ) {
        var webSite = {
            name: SiteName.value,
            url: siteUrl.value,
          };
          allSite.splice(pSite, 1, webSite);
          localStorage.setItem("webSite", JSON.stringify(allSite));
          siteUrl.classList.add("is-valid");
          SiteName.classList.add("is-valid");
          siteUrl.classList.remove("is-invalid");
          SiteName.classList.remove("is-invalid");
          display();
          clear();
          submitBtn.classList.replace("d-none", "d-block");
          editBtn.classList.replace("d-block", "d-none");
    } else {
        SiteName.style.color = "red";
        siteUrl.style.color = "red";
        SiteName.style.borderColor = "red";
        SiteName.style.borderWidth = "2px";
        siteUrl.style.borderColor = "red";
        siteUrl.style.borderWidth = "2px";
        siteUrl.classList.remove("is-valid");
        SiteName.classList.remove("is-valid");
        siteUrl.classList.add("is-invalid");
        SiteName.classList.add("is-invalid");
        ovarlaymn.classList.add("appear");
    }

}

function visititem(index) {
  window.open(allSite[index].url);
}

function vaild() {
  var nameregex = /^[A-Z][a-z]{1,9}$/gm;
  var testing = nameregex.test(SiteName.value);
  if (testing === true) {
    SiteName.style.color = "green";
    SiteName.style.borderColor = "green";
    SiteName.style.borderWidth = "2px";
    return true;
  } else {
    return false;
  }
}

function vaildUrl() {
  var urlregex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  var test = urlregex.test(siteUrl.value);
  if (test === true) {
    siteUrl.style.color = "green";
    siteUrl.style.borderColor = "green";
    siteUrl.style.borderWidth = "2px";
    return true;
  } else {
    return false;
  }
}
function checking() {
  ovarlaymn.classList.remove("appear");
  ovarlaymn.classList.add("clear");
}

submitBtn.addEventListener("click", vaild);
submitBtn.addEventListener("click", vaildUrl);
closebtn.addEventListener("click", checking);
