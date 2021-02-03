export default function createAnims(context) {
  context.anims.create({
    key: 'scorpio_walk',
    frames: context.anims.generateFrameNumbers('scorpio', {
      start: 0,
      end: 19,
    }),
    frameRate: 80,
  });

  context.anims.create({
    key: 'scorpio_die',
    frames: context.anims.generateFrameNumbers('scorpio_die', {
      start: 0,
      end: 19,
    }),
    frameRate: 60,
  });

  context.anims.create({
    key: 'scorpio_hurt',
    frames: context.anims.generateFrameNumbers('scorpio_hurt', {
      start: 0,
      end: 19,
    }),
    frameRate: 80,
  });

  context.anims.create({
    key: 'wizardBlack_walk',
    frames: context.anims.generateFrameNumbers('wizardBlack', {
      start: 0,
      end: 19,
    }),
    frameRate: 25,
  });

  context.anims.create({
    key: 'wizardBlack_die',
    frames: context.anims.generateFrameNumbers('wizardBlack_die', {
      start: 0,
      end: 19,
    }),
    frameRate: 25,
  });

  context.anims.create({
    key: 'wizardBlack_hurt',
    frames: context.anims.generateFrameNumbers('wizardBlack_hurt', {
      start: 0,
      end: 19,
    }),
    frameRate: 30,
  });

  context.anims.create({
    key: 'littleOrc_walk',
    frames: context.anims.generateFrameNumbers('littleOrc', {
      start: 0,
      end: 19,
    }),
    frameRate: 25,
  });

  context.anims.create({
    key: 'littleOrc_die',
    frames: context.anims.generateFrameNumbers('littleOrc_die', {
      start: 0,
      end: 19,
    }),
    frameRate: 25,
  });

  context.anims.create({
    key: 'littleOrc_hurt',
    frames: context.anims.generateFrameNumbers('littleOrc_hurt', {
      start: 0,
      end: 19,
    }),
    frameRate: 30,
  });

  context.anims.create({
    key: 'levendor_walk',
    frames: context.anims.generateFrameNumbers('levendor', {
      start: 0,
      end: 19,
    }),
    frameRate: 25,
  });

  context.anims.create({
    key: 'levendor_die',
    frames: context.anims.generateFrameNumbers('levendor_die', {
      start: 0,
      end: 19,
    }),
    frameRate: 25,
  });

  context.anims.create({
    key: 'levendor_hurt',
    frames: context.anims.generateFrameNumbers('levendor_hurt', {
      start: 0,
      end: 19,
    }),
    frameRate: 50,
  });
}
