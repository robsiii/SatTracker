<?php

class Cache {
  
  public $dirname;
  public $duration;
  
  public function __construct($dirname, $duration) {
    $this->dirname = $dirname;
    $this->duration = $duration;
  }
  
  public function write ($filename, $content) {
    return file_put_contents($this->dirname.'/'.$filename, $content);
  }
  
  public function read ($filename) {
    return file_get_contents($this->dirname.'/'.$filename);
  }
}