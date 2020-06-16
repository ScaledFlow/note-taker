// const uuidv4 = require("uuid/v4");

const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting all notes from the db
const getNotes = () => {
  console.log("getNotes");
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// A function for saving a note to the db
const saveNote = (note) => {
  console.log("saveNote");
  console.log(note.id);
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// A function for deleting a note from the db
const deleteNote = (id) => {
  console.log("deleteNote");
  console.log(id);
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = () => {
  console.log("renderActiveNote");
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = function () {
  console.log("handleNoteSave");
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
    id: Math.floor(Math.random() * 100000000000),
  };

  console.log(newNote);
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = function (event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();
  console.log("handleNoteSave");
  const note = $(this).parent(".list-group-item").data();
  console.log(note);
  console.log(note.title);
  console.log(note.id);
  console.log("active note id: " + activeNote.id);

  if (activeNote.id === note.id) {
    console.log("active node = note.id");
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function () {
  console.log("handleNoteView");
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function () {
  console.log("handleNewNoteView");
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
const handleRenderSaveBtn = function () {
  console.log("handleRenderSaveBtn");
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    console.log("show save button");
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
const renderNoteList = (notes) => {
  console.log("renderNoteList");
  console.log(notes);
  $noteList.empty();

  const noteListItems = [];

  // Returns jquery object for li with given text and delete button
  // unless withDeleteButton argument is provided as false

  const create$li = (text, withDeleteButton = true) => {
    console.log("text passed into create$li: " + text);
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
      console.log("value of withDeleteButton: " + withDeleteButton);
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };

  if (notes.length === 0) {
    noteListItems.push(create$li("No saved Notes", false));
  }

  // Add ID to li String?
  notes.forEach((note) => {
    const $li = create$li(note.title).data(note);
    noteListItems.push($li);
  });

  console.log(noteListItems);

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
