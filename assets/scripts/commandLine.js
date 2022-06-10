let dec_times = "-1";
let inc_times = 0;
let inc = 14.93;

let commands = {};

// const str = "2322 72 tocirah sneab";
// const arr = str.split(/ (.*)/);
// console.log(str.contains);

fetch("assets/json/commands.json")
  .then((response) => response.json())
  .then((data) => (commands = data))
  .catch((error) => console.log(error));

function outputCommand(info, type) {
  return `
    <div class="user">
      <p>
        $ user > 
      </p>
      <p class="user_semi">
        :
      </p>  
      <p class="command  ${type}">                    
        ${info}
      </p>
    </div>`;
}

document.addEventListener(
  "keydown",
  (e) => {
    const cmdWindow = document.querySelector("#command_window");
    const input = document.querySelector("#command_input");
    const end = input.innerText.length;

    input.focus();
    document
      .getSelection()
      .setBaseAndExtent(
        document.getSelection().anchorNode,
        end,
        document.getSelection().focusNode,
        end
      );
    if (e.key === "Enter") {
      e.preventDefault();
      let command = input.innerHTML;
      let args = command.split(/(?<=^\S+)\s/);
      let command_input = args.shift();
      cmdWindow.innerHTML = cmdWindow.innerHTML + outputCommand(command);
      console.log(command, args, command_input);

      if (command.length > 0) {
        if (commands[command_input]) {
          cmdWindow.innerHTML += outputCommand(
            `running <i>${command_input}</i>`,
            "run"
          );
          switch (commands[command_input].type) {
            case "cmd_only":
              cmdWindow.innerHTML += commands[command].output;
              break;
            case "user_dep":
              cmdWindow.innerHTML += 
              commands[command_input].output.replace("%DEPENDENCY",command_input.replace(`${command_input}`,`${args[0]}`))
              break;

            default:
              break;
          }
        } else {
          cmdWindow.innerHTML += `
          <div class="user">
            <p class="warn">WARN ! Cannot regonize <i>${command_input}</i> as a command. <br>
                            If you are unsure of what commands are available, run <i>help</i>. 
          </div>`;
        }
      }

      input.innerHTML = "";
    }
  },
  false
);
