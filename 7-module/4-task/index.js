import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.segments = steps - 1;
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${value}</span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps"></div>
      </div>
    `);
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      const span = document.createElement('span');
      if (i === 0) {
        span.className = 'slider__step-active';
      }
      span.dataset.stepValue = i;
      this.sliderSteps.append(span);
    }
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderStepsSpans = this.sliderSteps.querySelectorAll('span');
    this.sliderProgress.style.width = '0%';
    this.changeValue(steps);
    this.changeValueMouse(steps);
  }

  changeValue(steps) {
    this.elem.addEventListener('click', (e) => {
      let rect = this.elem.getBoundingClientRect();
      const left = e.clientX - rect.left;
      const leftRelative = left / this.elem.offsetWidth;
      const segments = steps - 1;
      const stepValue = leftRelative * segments;
      const stepValueCeil = Math.round(stepValue);
      this.value = stepValueCeil;
      const valuePercents = stepValueCeil / segments * 100;

      this.sliderValue.textContent = stepValueCeil;
      this.thumb.style.left = `${valuePercents}%`;
      this.sliderProgress.style.width = `${valuePercents}%`;

      this.sliderStepsSpans.forEach(span => {
        if (span.dataset.stepValue === this.sliderValue.textContent) {
          span.classList.add('slider__step-active');
        } else {
          span.classList.remove('slider__step-active');
        }
      });
      const event = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      });
      this.elem.dispatchEvent(event);
    });
  }

  onMouseMove = (mouseMoveEvent) => {
    const left = mouseMoveEvent.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let leftPercents = leftRelative * 100;

    const stepValue = leftRelative * this.segments;
    const stepValueCeil = Math.round(stepValue);
    this.sliderValue.textContent = stepValueCeil;
    this.value = stepValueCeil;
    this.percents = leftPercents;
    this.thumb.style.left = `${leftPercents}%`;
    this.sliderProgress.style.width = `${leftPercents}%`;
    this.sliderStepsSpans.forEach((span) => {
      if (span.dataset.stepValue === this.sliderValue.textContent) {
        span.classList.add('slider__step-active');
      } else {
        span.classList.remove('slider__step-active');
      }
    });
  };

  offMouseMove = () => {
    const valuePercents = this.value / this.segments * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.sliderProgress.style.width = `${valuePercents}%`;
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);

    document.removeEventListener('pointermove', this.onMouseMove);
    this.thumb.removeEventListener('pointerup', this.offMouseMove);
  };

  changeValueMouse() {
    this.thumb.ondragstart = () => false;

    this.thumb.addEventListener('pointerdown', () => {
      this.elem.classList.add('slider_dragging');
      this.thumb.style.position = 'absolute';

      document.addEventListener('pointermove', this.onMouseMove);
      this.thumb.addEventListener('pointerup', this.offMouseMove);
    });
  }
}
