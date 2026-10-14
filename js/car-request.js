// Update these lists as needed. Listing a model does not imply availability.
const carModelsByBrand = {
  'كيا': [
    'بيكانتو (Picanto)', 'ريو (Rio)', 'K3', 'سيراتو (Cerato)', 'K4', 'K5', 'K8', 'K9',
    'سول (Soul)', 'ستونيك (Stonic)', 'سيلتوس (Seltos)', 'نيـرو (Niro)', 'سبورتاج (Sportage)',
    'سورينتو (Sorento)', 'تيلورايد (Telluride)', 'كارينز (Carens)', 'كارنفال (Carnival)',
    'EV3', 'EV5', 'EV6', 'EV9'
  ],
  'هيونداي': [
    'أتوس (Atos)', 'i10', 'i20', 'i30', 'أكسنت (Accent)', 'إلنترا (Elantra)', 'سوناتا (Sonata)',
    'جراندور (Grandeur)', 'كاسبر (Casper)', 'بايون (Bayon)', 'فينيو (Venue)', 'كريتا (Creta)',
    'كونا (Kona)', 'توسان (Tucson)', 'سانتا فيه (Santa Fe)', 'باليسيد (Palisade)',
    'ستاريا (Staria)', 'H-1', 'أيونيك 5 (IONIQ 5)', 'أيونيك 6 (IONIQ 6)'
  ]
};

(() => {
  const form = document.getElementById('carRequestForm');
  if (!form) return;

  const brandSelect = document.getElementById('carBrand');
  const modelSelect = document.getElementById('carModel');
  const otherModelField = document.getElementById('otherModelField');
  const otherModelInput = document.getElementById('otherModel');
  const yearSelect = document.getElementById('carYear');

  for (let year = 2026; year >= 2000; year -= 1) {
    const option = document.createElement('option');
    option.value = String(year);
    option.textContent = String(year);
    yearSelect.appendChild(option);
  }

  brandSelect.addEventListener('change', () => {
    modelSelect.replaceChildren();
    const prompt = document.createElement('option');
    prompt.value = '';
    prompt.textContent = 'اختر الموديل';
    prompt.disabled = true;
    prompt.selected = true;
    modelSelect.appendChild(prompt);

    (carModelsByBrand[brandSelect.value] || []).forEach((model) => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });

    const otherOption = document.createElement('option');
    otherOption.value = 'موديل آخر';
    otherOption.textContent = 'موديل آخر';
    modelSelect.appendChild(otherOption);
    modelSelect.disabled = false;
    modelSelect.value = '';
    otherModelInput.value = '';
    otherModelInput.required = false;
    otherModelField.hidden = true;
  });

  modelSelect.addEventListener('change', () => {
    const isOther = modelSelect.value === 'موديل آخر';
    otherModelField.hidden = !isOther;
    otherModelInput.required = isOther;
    if (!isOther) otherModelInput.value = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const model = modelSelect.value === 'موديل آخر'
      ? otherModelInput.value.trim()
      : modelSelect.value;
    const phone = document.getElementById('customerPhone').value.trim();
    const rows = [
      ['الماركة', brandSelect.value],
      ['الموديل', model],
      ['سنة الصنع', yearSelect.value || 'غير محددة'],
      ['تفاصيل الطلب', document.getElementById('requestDetails').value.trim()],
      ['اسم العميل', document.getElementById('customerName').value.trim()],
      ['رقم هاتف العميل', phone]
    ].filter(([, value]) => value);

    const message = 'مرحباً، أود طلب سيارة:\n\n' + rows
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n');
    const whatsappUrl = `https://wa.me/218930074440?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
})();
