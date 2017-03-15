'use babel';

const commitLive = {
  gateWayString: '[{"name": "Select Kernels For Your File", "options": { "baseUrl": "http://35.154.189.94:8888" }}]',
  localStoragekey : 'commit-live:user-info',

  getGatewayConfig() {
    return this.gateWayString;
  },
  appendImportPathToCode(code){
    const exeCode =  this.getImportString();
    if(exeCode){
      console.log("exeCode + code");
      console.log(exeCode + code);
      return exeCode + code;
    }
    console.log("only code");
    console.log(code);
    return code;
  },
  getImportString(){
    const filename = this.getOpenFileName();
    if(filename){
      const extension = this.getFileExtension(filename);
      if(extension === 'py'){
        return this.getPythonImportString();
      }
    }
    return false;
  },
  getPythonImportString(){
    const courseFolderPath = this.getCourseFolderPath();
    if(courseFolderPath){
      return "import sys \n" + "sys.path.append('"+courseFolderPath+"') \n";
    }
    return false;
  },
  getOpenFileName(){
    const file = this.getFileObject();
    const filename = file != null ? file.getBaseName() : void 0;
    return filename;
  },
  getFileObject(){
    const editor = atom.workspace.getActivePaneItem()
    return  editor!= null ? (ref = editor.buffer) != null ? ref.file : void 0 : void 0;
  },
  getFileExtension(filename){
    return filename.split('.').pop()
  },
  getWorkspacePath(filename){
    return JSON.parse(localStorage.getItem(this.localStoragekey)).remote;
  },
  getCourseFolderPath(filename){
    const workspacePath = this.getWorkspacePath()
    if(workspacePath!= null){
      const file = this.getFileObject();
      console.log(file.path);
      const pathString = file.path.replace(/\\/g, '/');
      console.log(pathString);
      if(pathString){
        let regForReplace = /^.*code/;
        const arrPath = pathString.replace(regForReplace ,'').split('/');
        const courseFolderName = arrPath[1];
        return this.getWorkspacePath() + courseFolderName;
      }
    }
    return false;
  },
};

export default commitLive;
