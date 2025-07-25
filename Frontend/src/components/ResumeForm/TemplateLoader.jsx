import React, { lazy, Suspense } from 'react';

const TemplateLoader = ({ templateName, data, id }) => {
  if (!templateName) {
    console.error('Missing templateName:', { templateName, data, id });
    throw new Error('Template name is required');
  }

  // Only allow known templates
  const validTemplates = ['GeneralPreview', 'SpecializedPreview'];
  if (!validTemplates.includes(templateName)) {
    return <div style={{color: 'red', padding: 16}}>Unknown or unsupported template: <b>{templateName}</b></div>;
  }

  let TemplateComponent;
  try {
    TemplateComponent = lazy(() => import(`./Template/${templateName}.jsx`));
  } catch (err) {
    return <div style={{color: 'red', padding: 16}}>Template file not found: <b>{templateName}.jsx</b></div>;
  }

  return (
    <Suspense fallback={<div>Loading template...</div>}>
      <TemplateComponent data={data} id={id} />
    </Suspense>
  );
};

export default TemplateLoader;