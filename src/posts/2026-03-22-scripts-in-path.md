---
title: Putting scripts into $PATH
subtitle: A personal digital multitool
date: 2026-03-22
tags: [Linux, scripts, shell]
---

<span class="newthought">Whenever I find myself doing a task for a third</span> time, it's probably going to come up again and probably worth writing a script to get it done faster when it does. This is a pretty common habit far from unique, but mine were beginning to get out of hand so I was interested to see [Evan Hahn's post](https://evanhahn.com/why-alias-is-my-last-resort-for-aliases/) about handling the cutter.

### Ditching aliases

Instead of using aliases in `bashrc` (or in my case usually `config.fish`) for execution, Evan recommends adding basic scripts to a directory. You can then put that directory in your PATH [^path] and have the script execute right from your shell, while the directory is version controlled. 

[^path]: The $PATH is the list of places where your system looks to find commands it's being executed. This is different to the common (lowercase) 'file path' showing where a file is found.

The effect is like a personal multitool that's ready whenever you need it. Maybe obvious in hindsight but quite powerful in practice. [Julia Evans also explains](https://jvns.ca/blog/2025/02/13/how-to-add-a-directory-to-your-path/) how to do this in a very clear way, covering lots of different cases.

I found the idea compelling and started using it straight away.

### Doing the thing

I use fish shell (because it [just works](https://shkspr.mobi/blog/2021/06/what-do-you-call-open-source-software-that-just-works/)), so I can use the handy "do what you mean" built-in[^warn] to do this:

```
~> fish_add_path (realpath ./script-path)
```

The (realpath ...) function in the snippet above will be replaced by the full directory path. That will then be added to the PATH.

[^warn]: Although Julia Evans [warns against this](https://jvns.ca/blog/2025/02/13/how-to-add-a-directory-to-your-path/#a-note-on-fish-add-path) for a couple of reasons, including that it's hard to undo.

## 'Symlinks' is always the answer

<span class="newthought">One tweak</span> to the setup I use is to have two folders:

 - `/.../scripts` for the scripts themselves, which is version controlled and
 - a subdirectory `/.../scripts/script-path`, which goes into the PATH.

<figure class="marginfigure">
  <label for="mf-tree" class="margin-toggle">&#8853;</label>
  <input type="checkbox" id="mf-tree" class="margin-toggle"/>
  <span class="marginnote">
    <code>scripts/<br>├── myscript.sh<br>├── .gitignore<br>└── script-path/<br>&nbsp;&nbsp;&nbsp;&nbsp;└── myscript</code><br><br>
    <code>script-path/</code> is gitignored and goes on $PATH; the scripts themselves stay under version control in the parent directory.
  </span>
</figure>

I can then use git to track the version control in the `scripts` directory, without needing to have a git history in my PATH (which feels like it could go wrong). So:

```
/.../scripts ~> mkdir script-path
/.../scripts ~> git init
/.../scripts ~> echo "script-path/" >> .gitignore
```

All that remains is to add the scripts themselves to the subdirectory. Rather than making copies of the various scripts, symlinks do the job cleanly. This way even when I update the main files, the symlinks still point where I want them to, and the files themselves remain under version control. Add scripts one at a time[^bulk] with:

```
ln -s (realpath ./scripts/myscript.sh) ./script-path/myscript
```

[^bulk]: The first time, I did it in bulk. All my existing scripts were named with a .sh extension so in fish: `~> for sh_file in *.sh; set filename_without_extension (string split -r -m1 . $sh_file); ln -s (realpath $sh_file) ./script-path/$filename_without_extension; end`

And don't forget to give all the script files executable permission with `chmod +x filename.sh`.
