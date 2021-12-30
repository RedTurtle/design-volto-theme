import faFileXml from '@italia/icons/file-xml.svg';
import faFileXsd from '@italia/icons/file-xsd.svg';
import faFileOdp from '@italia/icons/file-odp.svg';
import faFileOds from '@italia/icons/file-ods.svg';
import faFileOdt from '@italia/icons/file-odt.svg';

export const FILE_FORMATS = {
  'text/rtf': { icon: { lib: 'far', name: 'file-alt' }, format_name: 'rtf' },
  'application/pdf': {
    icon: { lib: 'far', name: 'file-pdf' },
    format_name: 'pdf',
  },
  'application/zip': {
    icon: { lib: 'far', name: 'file-archive' },
    format_name: 'zip',
  },
  'application/gzip': {
    icon: { lib: 'far', name: 'file-archive' },
    format_name: 'gzip',
  },
  'application/vnd.rar': {
    icon: { lib: 'far', name: 'file-archive' },
    format_name: 'rar',
  },
  'application/x-tar': {
    icon: { lib: 'far', name: 'file-archive' },
    format_name: 'tar',
  },
  'application/json': {
    icon: { lib: 'fas', name: 'code' },
    format_name: 'json',
  },
  'text/javascript': {
    icon: { lib: 'fas', name: 'code' },
    format_name: 'js',
  },
  'text/html': { icon: { lib: 'fas', name: 'code' }, format_name: 'html' },
  'image/jpg': {
    icon: { lib: 'far', name: 'file-image' },
    format_name: 'jpg',
  },
  'image/jpeg': {
    icon: { lib: 'far', name: 'file-image' },
    format_name: 'jpeg',
  },
  'image/png': {
    icon: { lib: 'far', name: 'file-image' },
    format_name: 'png',
  },
  'image/svg': {
    icon: { lib: 'far', name: 'file-image' },
    format_name: 'svg',
  },
  'application/msword': {
    icon: { lib: 'far', name: 'file-word' },
    format_name: 'Word',
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    icon: { lib: 'far', name: 'file-word' },
    format_name: 'Word',
  },
  'application/vnd.ms-excel': {
    icon: { lib: 'far', name: 'file-excel' },
    format_name: 'Excel',
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    icon: { lib: 'far', name: 'file-excel' },
    format_name: 'Excel',
  },
  'application/vnd.ms-powerpoint': {
    icon: { lib: 'far', name: 'file-ppt' },
    format_name: 'PowerPoint',
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    icon: { lib: 'far', name: 'file-ppt' },
    format_name: 'PowerPoint',
  },
  'text/xml': {
    icon: { lib: '', name: faFileXml, svg_format: true },
    format_name: 'XML',
  },
  'application/xml': {
    icon: { lib: '', name: faFileXml, svg_format: true },
    format_name: 'XML',
  },
  'text/plain': {
    icon: { lib: 'far', name: 'file-alt' },
    format_name: 'TXT',
  },
};

export const FILE_EXTENSIONS = {
  xsd: {
    icon: { lib: '', name: faFileXsd, svg_format: true },
    format_name: 'XSD',
  },
  odt: {
    icon: { lib: '', name: faFileOdt, svg_format: true },
    format_name: 'ODT',
  },
  ods: {
    icon: { lib: '', name: faFileOds, svg_format: true },
    format_name: 'ODS',
  },
  odp: {
    icon: { lib: '', name: faFileOdp, svg_format: true },
    format_name: 'ODP',
  },
};

export const getFileViewFormat = (file) => {
  const regexEx = /(?:\.([^.]+))?$/;
  const fileExtension = regexEx.exec(file.filename)[1];
  const typeOfContent = file['content-type'];

  const viewFormat = {
    icon: null,
    label: null,
  };
  if (FILE_EXTENSIONS[fileExtension]) {
    viewFormat.icon = FILE_EXTENSIONS[fileExtension].icon;
    viewFormat.label = FILE_EXTENSIONS[fileExtension].format_name;
  } else if (FILE_FORMATS[typeOfContent]) {
    viewFormat.icon = FILE_FORMATS[typeOfContent]?.icon;
    viewFormat.label = FILE_FORMATS[typeOfContent].format_name;
  }
  return viewFormat;
};
