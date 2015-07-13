# compng

Compress your png files automatically. Simply run `compng` and indicate a directory where your pngs live.

compng will find your png files, compress them with [pngquant](https://pngquant.org/) and save them in a directory with name `compressed`.

## Install

```
npm install --global compng
```

## Requirements

- [pngquant](https://pngquant.org/) installed and on your $PATH.

## Example

Before compng

```
~/pngs
  - img1.png
  - img2.png
```

After `compng ~/pngs`

```
~/pngs/
  img1.png
  img2.png
  compressed/
    img1.png
    img2.png 
```