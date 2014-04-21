# npm-which

### Locate a program or locally installed node module's executable
`npm-which` runs in the context of an npm lifecycle script with its npm-modified PATH.

## Usage

```bash
> npm-which tape
/Users/timoxley/Projects/npm-which/node_modules/.bin/tape
```

### Example

```bash
# unless something is installed in a node_modules
# npm-which and which(1) will have the same output:

> which tape
/usr/local/bin/tape

> npm-which tape
/usr/local/bin/tape

# install tape local to current dir
# tape includes an executable 'tape'
> npm install tape
> ./node_modules/.bin/tape && echo 'found'
found

# vanilla which(1) still finds global tape
> which tape
/usr/local/bin/tape

# npm-which finds locally installed tape :)
> npm-which tape
/Users/timoxley/Projects/npm-which/node_modules/.bin/tape
```

## Why

#### npm is slow to boot

* Shelling out to `npm bin` is very slow; it has to wait for all of npm to boot up – this often takes longer than the actual script you want to execute!

#### Hard-coding paths to modules is very fragile

* You can't rely on './node_modules' actually containing your module! The module may exist much higher in the directory hierarchy.
* `npm bin` returns the location of the `./node_modules/.bin` directory, but it does not take into account being called within the context of another module, also, npm slow.
* If the module does exist in a parent directory, then './node_modules/.bin' will be missing your module's executable.

## License

MIT
