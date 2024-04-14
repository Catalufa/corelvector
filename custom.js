const loadCustom = setInterval(() => {
  if (gDesigner.isReady()) {
    initCustom();
    clearInterval(loadCustom)
  }
}, 100)

function initCustom() {
// let newText = `Host: ${window.location.host}`
let newText = "Plugins"
// gDesigner.getMainMenu().clearItems()
let newMenu = gDesigner.addMenuItem(gDesigner.getMainMenu(), newText, false, false, false, evt => {
    gDesigner.openDeactivatedUserDialog({getFullUserName: function() {return `
        <div id="custom-msg" class="g-overlay">
            <h1>Run JS on load</h1>
            <textarea type="text" placeholder="Custom JS..."></textarea>
            <button onclick="localStorage.setItem('custom-js', this.parentElement.querySelector('textarea').value)">Save</button>
        </div>
        <style>
        #custom-msg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .g-btn-close {
            z-index: 9999;
        }
        .g-dialog-content {
          background: transparent !important;
        }
        .g-dialog-content .icon {
          background: transparent !important;
        }
        </style>
        <script>
            document.querySelector("#custom-msg textarea").value = localStorage.getItem("custom-js") || "";
        </script>
        
    `}})
})
try {
  new Function(localStorage.getItem("custom-js") || "console.log('No plugins loaded')")()
} catch {
  console.log('Error loading plugins')
}
// newMenu._htmlElement[0].style.background = "#D72E63"
// newMenu._htmlElement[0].querySelector(".g-menu-item-caption").style.background = "inherit"
}