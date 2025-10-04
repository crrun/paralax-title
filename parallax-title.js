// The parallax effect of titles
const paralaxTitle = document.querySelectorAll('.paralax-title span');
const paralaxText_Arr = paralaxTitle[0].querySelectorAll('h3');
const paralaxText2_Arr = paralaxTitle[1].querySelectorAll('p');
const designElem_Arr = Array.from(design.children).filter((elem) => elem.localName == 'section');
const prec = 100 / paralaxText_Arr.length;
let ir = 0; 
const centerTitle = Math.ceil(paralaxText_Arr.length / 2) - (ir + 1);
var prec_count;
var prec_text;
var prec_text2;
var sign;

paralaxTitle[0].style.transform = 'translateX(' + prec * centerTitle + '%)';
paralaxText_Arr.forEach((text, index) => {
	if(index < ir) {
		prec_text = (ir - index > 1) ? 3 : 1;
		text.style.transform = `perspective(300px) translate3d(${prec_text * 40}%, -50px, -200px) rotate3d(${3}, 3, ${3}, 10deg)`;
	} else if((index > ir)) {
		prec_text = (index - ir > 1) ? -3 : -1;
		text.style.transform = `perspective(300px) translate3d(${prec_text * 40}%, -50px, -200px) rotate3d(${-3}, 3, ${-3}, 10deg)`;
	}
	if(index !== ir && designElem_Arr.length >= index + 1) designElem_Arr[index].style.display = 'none';
	if(index !== ir) paralaxText2_Arr[index].style.display = 'none';
	text.onclick = () => {
		const anim = text.animate([
				{ transform: 'translate3d(0, 0, 0) rotateY(0)' }
			],
				{ duration: 500, fill: 'forwards', composite: 'replace' }
			);
		anim.commitStyles();
		anim.persist();
		paralaxText_Arr.forEach((text2, index2) => {
			if(index !== index2) {
				if(index2 < index) prec_text2 = (index - index2 > 1) ? 3 : 1; 
				else prec_text2 = (index2 - index > 1) ? -3 : -1;
				sign = Math.sign(prec_text2);
				const anim2 = text2.animate([
					{ transform: `perspective(300px) translate3d(${prec_text2 * 40}%, -50px, -200px) rotate3d(${sign * 3}, 3, ${sign * 3}, 10deg)` }
				],
				{ duration: 500, fill: 'forwards', composite: 'replace' });
				anim2.commitStyles();
				anim2.persist();
			}
		});
		if(index > ir) {
			prec_count = ir - index;
			ir = index;
		} else if(index == ir) {
			prec_count = 0;
		} else {
			prec_count = ir - index;
			ir = index;
		}
		paralaxTitle[0].animate([
			{ transform: `translateX(${prec_count * prec}%)`}
		], { 
			duration: 500, fill: 'both',
		composite: 'accumulate' }).persist();
		designElem_Arr.forEach((elem2, index2) => {
			if(index2 !== index) {
				elem2.style.display = 'none';
			} else {
				elem2.style.display = 'block';
			}
		});
		paralaxText2_Arr.forEach((elem2, index2) => {
			if(index2 === index) {
				elem2.style.display = 'flex';
				elem2.animate({opacity: ['.1', '1']}, 500);
			} else {
				elem2.style.display = 'none';	
			}
		});
	}

});
