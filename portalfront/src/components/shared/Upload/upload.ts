// import BRTooltip from '../../components/tooltip/tooltip'
class BRUpload {
  name: string;

  component: any;

  _inputElement: any;

  _fileList: any;

  _btnUpload: any;

  _label: any;

  _textHelp: any;

  _fileArray: any[];

  _uploadFiles: any;

  listFilesUpdated: any;

  /**
   *
   * @param {*} name nome do componente
   * @param {*} component componente
   * @param {*} uploadFiles  promisse de status do upload
   * @param {*} listFilesUpdated  lista de arquivos enviados
   */
  constructor(name, component, uploadFiles, listFilesUpdated?) {
    this.name = name;
    this.component = component;
    this._inputElement = this.component.querySelector('.upload-input');
    this._fileList = this.component.querySelector('.upload-list');
    this._btnUpload = this.component.querySelector('.upload-button');
    this._label = this.component.querySelector('label');
    this._textHelp = document.querySelector('.text-base');
    this._fileArray = [];
    this._uploadFiles = uploadFiles;
    this._setBehavior();
    this.listFilesUpdated = listFilesUpdated;
  }

  _setBehavior() {
    this.component.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });

    this.component.addEventListener('dragenter', () => {
      this.component.classList.add('dragging');
    });

    this.component.addEventListener('dragleave', () => {
      this.component.classList.remove('dragging');
    });

    this.component.addEventListener('drop', (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.component.classList.remove('dragging');
      const dt = event.dataTransfer;
      const { files } = dt;
      this._handleFiles(files);
    });

    if (this._inputElement) {
      const button = document.createElement('button');
      button.className = 'br-button upload-button w-100';
      button.setAttribute('type', 'button');

      if (this._inputElement.getAttribute('multiple')) {
        button.innerHTML = '<i class="fas fa-upload" aria-hidden="true"></i><span>Selecione o(s) arquivo(s)</span>';
      }
      else button.innerHTML = '<i class="fas fa-upload" aria-hidden="true"></i><span>Selecione o arquivo</span>';

      this.component.append(this._label);
      this.component.append(this._inputElement);
      this.component.appendChild(button);
      this.component.append(this._fileList);
      this._btnUpload = this.component.querySelector('.upload-button');
      this._btnUpload.addEventListener(
        'click',
        () => {
          this._clickUpload();
        },
        false,
      );
      if (this.component.getAttribute('disabled')) {
        const message = document.createElement('span');
        message.classList.add('feedback', 'warning', 'mt-1');
        message.setAttribute('role', 'alert');
        message.innerHTML = '<i class="fas fa-exclamation-triangle" aria-hidden="true"></i>Upload desabilitado';
        this.component.after(message);
      }

      this._fileArray = Array.from(this._inputElement.files);
      this._inputElement.addEventListener(
        'change',
        (event) => {
          this._handleFiles(event);
        },
        false,
      );
    }
  }

  _clickUpload() {
    this._inputElement.click();
  }

  _removeMessage() {
    for (const message of this.component.querySelectorAll('.feedback')) {
      message.parentNode.removeChild(message);
      message.innerHTML = '';
    }
  }

  _removeStatus() {
    const remStatus = ['danger', 'warning', 'info', 'success'];
    remStatus.forEach((el) => {
      if (this.component.dataset.hasOwnProperty(el)) this.component.removeAttribute(`data-${el}`);
    });
  }

  _feedback(status, text) {
    const icone = `<i class="fas fa-times-circle" aria-hidden="true"></i>${text}`;
    const dataStatus = `data-${status}`;
    const message = document.createElement('span');
    message.classList.add('feedback', status, 'mt-1');
    message.setAttribute('role', 'alert');
    switch (status) {
      case 'danger':
        message.innerHTML = icone;
        break;
      case 'info':
        message.innerHTML = icone.replace('fa-times-circle', 'fa-info-circle');
        break;
      case 'success':
        message.innerHTML = icone.replace('fa-times-circle', 'fa-check-circle');
        break;
      case 'warning':
        message.innerHTML = icone.replace('fa-times-circle', 'fa-exclamation-triangle');
        break;
      default:
        message.innerHTML = '';
    }
    this._removeStatus();
    this.component.setAttribute(dataStatus, dataStatus);
    this._fileList.before(message);
  }

  _concatFiles(files) {
    const newFiles = !files.length ? Array.from(this._inputElement.files) : Array.from(files);
    this._fileArray = this._fileArray.concat(newFiles);
  }

  _checkAccept(files: File[]) {
    const arrayAccepts = String(this._inputElement.accept).toLowerCase().split(',');

    if (arrayAccepts) {
      return Array.from(files).map((element) =>
        arrayAccepts.includes(`.${element.name.split('.').pop().toLowerCase()}`),
      );
    }
    return [true];
  }

  _handleFiles(files) {
    this._removeMessage();
    const accepts = this._checkAccept(this._inputElement.files);
    if (accepts.every((item) => item)) {
      if (!this._inputElement.multiple && files.length > 1) {
        this._feedback('danger', 'É permitido o envio de somente um arquivo.');
      } else if (!this._inputElement.multiple && this._fileArray.length > 0) {
        this._fileArray = [];
        this._concatFiles(files);
        this._updateFileList();
        this._feedback('warning', 'O arquivo enviado anteriormente foi substituído');
      } else {
        this._concatFiles(files);
        this._updateFileList();
      }
    } else {
      this._feedback('danger', 'Extensão não permitida.');
    }
  }

  _updateFileList() {
    this._removeStatus();
    if (this.component.nextElementSibling === this._textHelp) {
      this._textHelp.style.display = 'none';
    }
    if (!this._fileArray.length) {
      this._fileList.innerHTML = '';
      if (this.component.nextElementSibling === this._textHelp) {
        this._textHelp.style.display = '';
      }
    } else {
      this._fileList.innerHTML = '';
      this.listFilesUpdated(this._fileArray);
      for (let i = 0; i < this._fileArray.length; i++) {
        if ('nowait' in this._fileArray[i]) {
          if (this._fileArray[i].nowait) {
            this._renderItem(i);
          }
        } else {
          const loading = document.createElement('div');
          const carga = document.createElement('span');
          carga.classList.add('cargas');
          carga.innerText = 'Carregando...';
          loading.setAttribute('sm', '');
          loading.classList.add('my-3');
          loading.setAttribute('loading', '');
          loading.appendChild(carga);
          this._fileList.appendChild(loading);
          if (this._uploadFiles()) {
            // FIXME: Essa promise está repetindo essa ação exponencialmente
            this._uploadFiles().then(() => {
              this._fileArray[i].nowait = true;
              this._updateFileList();
            });
          }
        }
      }
    }
  }

  _renderItem(position) {
    const li = document.createElement('div');
    li.className = 'br-item';
    this._fileList.appendChild(li);
    li.innerHTML = '';
    const name = document.createElement('div');
    name.className = 'name';
    li.appendChild(name);
    this._fileList.appendChild(li);
    const info = document.createElement('div');
    info.className = 'content';
    info.innerHTML = this._fileArray[position].name;
    const tooltip = document.createElement('div');
    tooltip.classList.add('br-tooltip');
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('place', 'top');
    tooltip.setAttribute('info', 'info');
    const textTooltip = document.createElement('span');
    textTooltip.classList.add('text');
    textTooltip.setAttribute('role', 'tooltip');
    textTooltip.innerHTML = this._fileArray[position].name;
    tooltip.appendChild(textTooltip);
    li.appendChild(info);
    li.appendChild(name);
    li.appendChild(tooltip);
    info.classList.add('text-primary-default', 'mr-auto');
    const del = document.createElement('div');
    del.className = 'support';
    const btndel = document.createElement('button');
    const spanSize = document.createElement('span');
    spanSize.className = 'mr-1';
    spanSize.innerHTML = this._calcSize(this._fileArray[position].size);
    del.appendChild(spanSize);
    btndel.className = 'br-button';
    btndel.type = 'button';
    btndel.setAttribute('circle', '');
    btndel.addEventListener(
      'click',
      (event) => {
        this._removeFile(position, event);
      },
      false,
    );
    const img = document.createElement('i');
    img.className = 'fa fa-trash';
    btndel.appendChild(img);
    del.appendChild(btndel);
    li.appendChild(del);
    this._fileArray[position].nowait = true;
    const tooltipList = [];
    // for (const brTooltip of window.document.querySelectorAll('.br-tooltip')) {
    //   tooltipList.push(new BRTooltip('br-tooltip', brTooltip))
    // }
  }

  _calcSize(nBytes) {
    let sOutput = '';
    for (
      let aMultiples = ['KB', 'MB', 'GB', 'TB'], nMultiple = 0, nApprox = nBytes / 1024;
      nApprox > 1;
      nApprox /= 1024, nMultiple++
    ) {
      sOutput = `${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`;
    }
    return sOutput;
  }

  _removeFile(index, event) {
    event.stopPropagation();
    event.preventDefault();
    this._removeStatus();
    this._removeMessage();
    this._fileArray.splice(index, 1);
    this._updateFileList();

    if (this._inputElement.multiple) this._inputElement.files = this._updateFileListItems(this._fileArray);
    if (!this._inputElement.multiple) this._inputElement.value = '';
  }

  _updateFileListItems(files) {
    const fileInput = new ClipboardEvent('').clipboardData || new DataTransfer();
    for (let i = 0, len = files.length; i < len; i++) fileInput.items.add(files[i]);
    return fileInput.files;
  }
}

export default BRUpload;
